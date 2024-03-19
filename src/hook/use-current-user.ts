import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();
  console.log('Session data:', session);

  return session.data?.user;
};
