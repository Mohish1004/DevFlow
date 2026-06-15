"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AccountType, WorkspaceUser } from "@/lib/workspace-types";

type RegisterPayload = {
  accountType: AccountType;
  displayName: string;
  email: string;
  organizationName?: string;
  teamCode?: string;
  teamName?: string;
};

type AuthState = {
  hydrated: boolean;
  markHydrated: () => void;
  loginWithDemo: (payload: Pick<WorkspaceUser, "displayName" | "email">) => void;
  logout: () => void;
  registerWithDemo: (payload: RegisterPayload) => WorkspaceUser;
  user: WorkspaceUser | null;
};

function createDemoTeamCode() {
  return `DEV-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function setDemoSessionCookie(enabled: boolean) {
  if (typeof document === "undefined") {
    return;
  }

  if (enabled) {
    document.cookie = "devflow_demo_session=1; path=/; max-age=2592000; SameSite=Lax";
    return;
  }

  document.cookie = "devflow_demo_session=; path=/; max-age=0; SameSite=Lax";
}

function buildDemoUser(payload: RegisterPayload): WorkspaceUser {
  const teamCode =
    payload.accountType === "team_member"
      ? payload.teamCode
      : payload.accountType === "solo_user"
        ? undefined
        : createDemoTeamCode();

  return {
    accountType: payload.accountType,
    displayName: payload.displayName,
    email: payload.email,
    joinLink: teamCode ? `http://localhost:3000/join/${teamCode}` : undefined,
    mode: "demo",
    organizationName: payload.organizationName,
    teamCode,
    teamName: payload.teamName,
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      hydrated: false,
      loginWithDemo: ({ displayName, email }) => {
        setDemoSessionCookie(true);
        set({
          user: {
            accountType: "team_leader",
            displayName,
            email,
            joinLink: "http://localhost:3000/join/DEV-DEMO",
            mode: "demo",
            teamCode: "DEV-DEMO",
            teamName: "Demo Workspace",
          },
        });
      },
      logout: () => {
        setDemoSessionCookie(false);
        set({ user: null });
      },
      markHydrated: () => set({ hydrated: true }),
      registerWithDemo: (payload) => {
        const user = buildDemoUser(payload);
        setDemoSessionCookie(true);
        set({ user });
        return user;
      },
      user: null,
    }),
    {
      name: "devflow-auth",
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
