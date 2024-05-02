import { create } from "zustand";
import type { JwtData } from "@shared/types/auth";
import { persist } from "zustand/middleware";

type AuthState =
  | {
      isAuthenticated: true;
      token: string;
      jwtData: JwtData;
    }
  | {
      isAuthenticated: false;
      token: null;
      jwtData: null;
    };

type AuthActions = {
  login: (jwt: string) => void;
  logout: () => void;
};

type AuthStore = AuthState & AuthActions;

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      jwtData: null,
      token: null,
      login: (jwt: string) => {
        const jwtData = JSON.parse(atob(jwt.split(".")[1])) as JwtData;
        set({
          isAuthenticated: true,
          jwtData,
          token: jwt,
        });
      },
      logout: () =>
        set({
          isAuthenticated: false,
          jwtData: null,
        }),
    }),
    {
      name: "auth",
    },
  ),
);
