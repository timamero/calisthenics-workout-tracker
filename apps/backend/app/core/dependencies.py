import datetime
import requests
from typing import Annotated, Dict, Any

from jose import jwt, JWTError
from cachetools import cached, TTLCache
from cryptography.hazmat.primitives.asymmetric import rsa, ec
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.backends import default_backend
from base64 import urlsafe_b64decode

from fastapi import Header, HTTPException, status

from .config import settings

# Cache JWKS for 10 minutes to reduce network requests.
jwks_cache = TTLCache(maxsize=1, ttl=600)


@cached(jwks_cache)
def fetch_jwks(jwks_url: str) -> Dict[str, Any]:
    """Fetches JWKS from Supabase's endpoint and caches it."""
    try:
        response = requests.get(jwks_url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch Supabase JWKS: {e}",
        )


def _construct_public_key(matching_jwk: Dict[str, Any], alg: str):
    """Constructs a public key object from JWK data."""
    if alg.startswith("RS"):  # RSA algorithm (RS256, RS384, RS512)
        n_bytes = urlsafe_b64decode(matching_jwk["n"] + "==")
        e_bytes = urlsafe_b64decode(matching_jwk["e"] + "==")
        return rsa.RSAPublicNumbers(
            int.from_bytes(e_bytes, "big"), int.from_bytes(n_bytes, "big")
        ).public_key(default_backend())
    elif alg.startswith("ES"):  # EC (Elliptic Curve) algorithm (ES256, ES384, ES512)
        curve_name = matching_jwk.get("crv")
        curve = {
            "P-256": ec.SECP256R1(),
            "P-384": ec.SECP384R1(),
            "P-521": ec.SECP521R1(),
        }.get(curve_name)

        if not curve:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Unsupported EC curve: {curve_name} for token verification.",
            )

        x_bytes = urlsafe_b64decode(matching_jwk["x"] + "==")
        y_bytes = urlsafe_b64decode(matching_jwk["y"] + "==")
        return ec.EllipticCurvePublicNumbers(
            int.from_bytes(x_bytes, "big"), int.from_bytes(y_bytes, "big"), curve
        ).public_key(default_backend())
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unsupported algorithm for token verification: {alg}",
        )


def get_current_user_id(authorization: Annotated[str, Header()]) -> str:
    """
    Dependency to extract and verify the JWT from the Authorization header
    using Supabase's JWKS. Returns the user ID (sub claim) if valid.
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated: Missing or invalid Authorization header.",
        )

    token = authorization.split(" ")[1]

    try:
        jwks = fetch_jwks(settings.supabase_jwtk_url)

        header = jwt.get_unverified_header(token)
        kid = header.get("kid")
        alg = header.get("alg")

        if not kid or not alg:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token header: Missing KID or ALG.",
            )

        # Find the matching JWK based on KID and ALG
        matching_jwk = None
        for key_data in jwks.get("keys", []):
            if key_data.get("kid") == kid and key_data.get("alg") == alg:
                matching_jwk = key_data
                break

        if not matching_jwk:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: No matching public key found in JWKS.",
            )

        # Delegate public key construction to a helper function
        public_key = _construct_public_key(matching_jwk, alg)

        # Decode and verify the JWT
        payload = jwt.decode(
            token,
            public_key.public_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PublicFormat.SubjectPublicKeyInfo,
            ),
            algorithms=[alg],
            audience="authenticated",
            issuer=f"{settings.supabase_url}/auth/v1",
        )

        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: User ID (sub) claim not found.",
            )
        return user_id
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid or expired token: {e}",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error during token verification: {e}",
        )


def generate_supabase_test_jwt(
    user_id: str = settings.test_uid,
    email: str = settings.test_email,
    role: str = "authenticated",
    custom_claims: dict = None,
    expires_in_minutes: int = 60,
) -> str:
    """
    Generates a signed JWT compatible with Supabase for testing.
    TODO: User this function later when creating tests.
    """
    supabase_jwt_secret = settings.supabase_jwt_key_id  # Get from environment variable
    if not supabase_jwt_secret:
        raise ValueError("SUPABASE_JWT_SECRET environment variable not set.")

    now = datetime.datetime.now()
    expiration = now + datetime.timedelta(minutes=expires_in_minutes)

    payload = {
        "aud": "authenticated",
        "exp": int(expiration.timestamp()),
        "iat": int(now.timestamp()),
        "iss": "supabase",
        "sub": user_id,
        "role": role,
        "email": email,
        "app_metadata": custom_claims if custom_claims else {},
    }

    # Ensure the secret is bytes
    secret_bytes = supabase_jwt_secret.encode("utf-8")

    signed_jwt = jwt.encode(claims=payload, key=secret_bytes, algorithm="HS256")
    return signed_jwt
