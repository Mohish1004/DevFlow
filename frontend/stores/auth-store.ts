"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  auth,
  hasFirebaseConfig,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut as firebaseSignOut,
} from "@/services/firebase";
import { api, ApiError } from "@/services/api-client";
import type { AccountType, WorkspaceUser } from "@/lib/workspace-types";

type AuthState = {
  hydrated: boolean;
  loading: boolean;
  user: WorkspaceUser | null;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
  markHydrated: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      loading: true,
      user: null,

      checkSession: async () => {
        if (!hasFirebaseConfig) {
          set({ loading: false });
          return;
        }
        try {
          const userData = await api.get<{
            email: string;
            displayName: string;
            accountType: string;
            teamCode?: string;
            teamName?: string;
            organizationName?: string;
            joinLink?: string;
            mode: string;
          }>("/api/me");
          set({
            user: {
              email: userData.email,
              displayName: userData.displayName,
              accountType: userData.accountType as AccountType,
              teamCode: userData.teamCode,
              teamName: userData.teamName,
              organizationName: userData.organizationName,
              joinLink: userData.joinLink,
              mode: userData.mode as "demo" | "firebase",
            },
            loading: false,
          });
        } catch (err) {
          if (err instanceof ApiError && err.status === 401) {
            set({ user: null, loading: false });
          } else {
            set({ loading: false });
          }
        }
      },

      loginWithDemo: (payload: Pick<WorkspaceUser, "displayName" | "email">) => {
    set({
      user: {
        accountType: "team_leader",
        displayName: payload.displayName,
        email: payload.email,
        joinLink: `${window.location.origin}/join/DEV-DEMO`,
        mode: "demo",
        teamCode: "DEV-DEMO",
        teamName: "Demo Workspace",
      },
      loading: false,
    });
  },

  loginWithEmail: async (email: string, password: string) => {
        if (!hasFirebaseConfig || !auth) {
          throw new Error("Firebase not configured");
        }
        await signInWithEmailAndPassword(auth, email, password);
        await get().checkSession();
      },

      registerWithEmail: async (email: string, password: string) => {
        if (!hasFirebaseConfig || !auth) {
          throw new Error("Firebase not configured");
        }
        await createUserWithEmailAndPassword(auth, email, password);
        await get().checkSession();
      },

      loginWithGoogle: async () => {
        if (!hasFirebaseConfig || !auth) {
          throw new Error("Firebase not configured");
        }
        await signInWithPopup(auth, new GoogleAuthProvider());
        await get().checkSession();
      },

      loginWithGithub: async () => {
        if (!hasFirebaseConfig || !auth) {
          throw new Error("Firebase not configured");
        }
        await signInWithPopup(auth, new GithubAuthProvider());
        await get().checkSession();
      },

      logout: async () => {
        if (hasFirebaseConfig && auth) {
          await firebaseSignOut(auth);
        }
        set({ user: null });
      },

      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "devflow-auth",
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
        state?.checkSession();
      },
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
