from backend.app.main import STRICT_RATE_LIMIT


async def test_read_root(client):
    response = await client.get("/")
    assert response.status_code == 200

    data = response.json()
    assert data["status"] == "healthy"
    assert "uptime_seconds" in data
    assert "version" in data
    assert "environment" in data


async def test_read_root_rate_limit_allows_up_to_limit(client):
    """All requests within the limit should succeed."""
    for i in range(STRICT_RATE_LIMIT):
        response = await client.get("/")
        assert response.status_code == 200, f"Request {i + 1} shoud have succeeded"


async def test_read_root_rate_limit_blocks_after_limit(client):
    """The request immediately after the limit should be blocked."""
    for _ in range(STRICT_RATE_LIMIT):
        await client.get("/")

    response = await client.get("/")
    assert response.status_code == 429
