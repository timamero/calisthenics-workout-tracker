import { useState } from "react";
import { type SupabaseClient } from "@supabase/supabase-js";
import { confirmUser } from "@cwt/auth";

export default function useConfirmUser(supabase: SupabaseClient) {
  const [status, setStatus] = useState<
    "idle" | "pending" | "confirmed" | "error"
  >("idle");
  const handleConfirmUser = async (tokenHash: string) => {
    setStatus("pending");
    try {
      const user = await confirmUser(supabase, tokenHash);
      if (!user) {
        // console.error('Auth error at confirmation');
        console.log("useConfirmUser || no user returned, returning null");
        setStatus("error");
        return null;
      } else {
        console.log("useConfirmUser || user confirmed, setting status");
        setStatus("confirmed");
        return user;
      }
    } catch (error) {
      setStatus("error");
      console.error(error);
      return null;
    }
  };

  return {
    status,
    setStatus,
    handleConfirmUser,
  };
}
