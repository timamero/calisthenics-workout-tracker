import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SupabaseClient } from "@supabase/supabase-js";

import { signIn } from "@cwt/auth";
import { createUser } from "@cwt/auth";
import {
  AuthSchema,
  AuthSignUpSchema,
  type Auth,
  type AuthSignUp,
} from "@cwt/schema/forms";
import { useAuthStore } from "@cwt/state/stores";

function useAuth(supabase: SupabaseClient) {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async ({ email, password }: Auth) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const user = await signIn(supabase, email, password);
      if (!user) {
        setAuthError("Failed to sign in. Please check your credentials.");
        return null;
      }
      setUser(user);
      return user;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      setAuthError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async ({ email, password }: Auth) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const user = await createUser(supabase, email, password);
      if (!user) {
        setAuthError("Failed to create account. Please try again.");
        return null;
      }
      setUser(user);
      return user;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      setAuthError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setAuthError(null);

  return { handleLogin, handleSignUp, isLoading, authError, clearError };
}

export function useAuthLogin(supabase: SupabaseClient) {
  const auth = useAuth(supabase);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return {
    isLoading: auth.isLoading,
    authError: auth.authError,
    clearError: auth.clearError,
    register,
    handleSubmit: handleSubmit(auth.handleLogin),
    errors,
  };
}
export function useAuthSignUp(supabase: SupabaseClient) {
  const auth = useAuth(supabase);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSignUp>({
    resolver: zodResolver(AuthSignUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return {
    isLoading: auth.isLoading,
    authError: auth.authError,
    clearError: auth.clearError,
    register,
    handleSubmit: handleSubmit(auth.handleSignUp),
    errors,
  };
}
export function useAuthLoginMobile(supabase: SupabaseClient) {
  const auth = useAuth(supabase);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return {
    isLoading: auth.isLoading,
    authError: auth.authError,
    clearError: auth.clearError,
    control,
    handleSubmit: handleSubmit(auth.handleLogin),
    errors,
  };
}
export function useAuthSignUpMobile(supabase: SupabaseClient) {
  const auth = useAuth(supabase);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSignUp>({
    resolver: zodResolver(AuthSignUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return {
    isLoading: auth.isLoading,
    authError: auth.authError,
    clearError: auth.clearError,
    control,
    handleSubmit: handleSubmit(auth.handleSignUp),
    errors,
  };
}
