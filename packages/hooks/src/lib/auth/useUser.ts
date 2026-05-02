import { useAuthStore } from "@cwt/state/stores";

export default function useUser() {
  const user = useAuthStore((state) => state.user);
  const name = user?.user_metadata.display_name;
  const email = user?.user_metadata.email;

  return {
    name,
    email,
  };
}
