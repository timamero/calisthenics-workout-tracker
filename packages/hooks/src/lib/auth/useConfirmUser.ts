import { useState } from "react";
import { type SupabaseClient } from "@supabase/supabase-js";
import { useAuthStore } from "@cwt/state/stores";
import { confirmUser } from "@cwt/auth";

export default function useConfirmUser(supabase: SupabaseClient) {
  // const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "pending" | "confirmed" | "failed"
  >("idle");
  // const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const handleConfirmUser = async (email: string, token: string) => {
    try {
      setStatus("pending");
      const user = await confirmUser(supabase, email, token);
      if (!user) {
        console.error("Auth error at confirmation");
        setStatus("failed");
        return null;
      }
      console.log("useConfirmUser || confirmation successful");
      setStatus("confirmed");
      // setUser(user);
      return user;
    } catch (error) {
      setStatus("failed");
      console.error(error);
      return null;
    } finally {
      setStatus("idle");
    }
  };

  return {
    status,
    handleConfirmUser,
  };
}
