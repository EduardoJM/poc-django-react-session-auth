import type { PropsWithChildren } from "react";
import { AuthContext } from "./auth-context";
import { useSuspenseQuery } from "@tanstack/react-query";
import api from "./lib/axios";
import type { User } from "./auth-types";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data: user } = useSuspenseQuery({
    queryKey: ['authenticated-user'],
    queryFn: async () => {
      try {
        const { data } = await api.get<User>('/auth/me/');
        return data;
      } catch {
        return null;
      }
    },
  })

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
};
