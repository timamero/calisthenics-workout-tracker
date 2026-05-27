import { useState } from "react";
import { type SupabaseClient } from "@supabase/supabase-js";
import { confirmUser } from "@cwt/auth";

export default function useConfirmUser(supabase: SupabaseClient) {
  const [status, setStatus] = useState<"pending" | "confirmed" | "error">(
    "pending",
  );
  const handleConfirmUser = async (tokenHash: string) => {
    try {
      const user = await confirmUser(supabase, tokenHash);
      if (!user) {
        setStatus("error");
        console.error("Auth error at confirmation");
        return null;
      }
      console.log("useConfirmUser || confirmed user");
      return user;
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
