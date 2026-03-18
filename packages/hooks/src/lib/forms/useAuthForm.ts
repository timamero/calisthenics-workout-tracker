import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SupabaseClient } from "@supabase/supabase-js";

import { signIn } from "@cwt/auth/signIn";
import { createUser } from "@cwt/auth/createUser";
import {
  AuthSchema,
  AuthSignUpSchema,
  type Auth,
  type AuthSignUp,
} from "@cwt/schema/forms";
import { AppTypeSchema } from "@cwt/schema/common";

function useAuthFormLogic(
  supabase: SupabaseClient,
  appType: AppTypeSchema,
  authType: "login" | "signup",
) {
  const defaultLoginValues = {
    email: "",
    password: "",
  };

  const defaultSignUpValues = {
    ...defaultLoginValues,
    confirmPassword: "",
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth | AuthSignUp>({
    resolver: zodResolver(authType === "login" ? AuthSchema : AuthSignUpSchema),
    defaultValues:
      authType === "login" ? defaultLoginValues : defaultSignUpValues,
  });

  const handleLogin = async ({ email, password }: Auth) => {
    const user = await signIn(supabase, email, password);
    console.log("User:", user);
  };

  const handleSignUp = async ({
    email,
    password,
  }: Pick<AuthSignUp, "email" | "password">) => {
    const user = createUser(supabase, email, password);
    console.log("User:", user);
  };

  if (appType === "web") {
    if (authType === "login") {
      return { handleLogin, handleSubmit, errors, register };
    }
    return { handleSignUp, handleSubmit, errors, register };
  }

  if (authType === "login") {
    return { handleLogin, handleSubmit, errors, control };
  }
  return { handleSignUp, handleSubmit, errors, control };
}

export function useAuthLogin(supabase: SupabaseClient) {
  return useAuthFormLogic(supabase, "web", "login");
}
export function useAuthLoginMobile(supabase: SupabaseClient) {
  return useAuthFormLogic(supabase, "mobile", "login");
}
export function useAuthSignUp(supabase: SupabaseClient) {
  return useAuthFormLogic(supabase, "web", "signup");
}
export function useAuthSignUpMobile(supabase: SupabaseClient) {
  return useAuthFormLogic(supabase, "mobile", "signup");
}
