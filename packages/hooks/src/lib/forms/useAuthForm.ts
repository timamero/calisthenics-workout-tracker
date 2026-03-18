import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SupabaseClient } from "@supabase/supabase-js";

import { signIn } from "@cwt/auth/signIn";
import { AuthSchema, type Auth } from "@cwt/schema/forms";
import { AppTypeSchema } from "@cwt/schema/common";

function useAuthFormLogic(supabase: SupabaseClient, appType: AppTypeSchema) {
  const {
    control,
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

  const handleLogin = async ({ email, password }: Auth) => {
    const user = await signIn(supabase, email, password);
    console.log("User:", user);
  };

  if (appType === "web") {
    return { handleLogin, handleSubmit, errors, register };
  }
  return { handleLogin, handleSubmit, errors, control };
}

export function useAuthLogin(supabase: SupabaseClient) {
  const { handleLogin, handleSubmit, errors, register } = useAuthFormLogic(
    supabase,
    "web",
  );

  return { handleLogin, handleSubmit, errors, register };
}
export function useAuthLoginMobile(supabase: SupabaseClient) {
  const { handleLogin, handleSubmit, errors, control } = useAuthFormLogic(
    supabase,
    "mobile",
  );

  return { handleLogin, handleSubmit, errors, control };
}
