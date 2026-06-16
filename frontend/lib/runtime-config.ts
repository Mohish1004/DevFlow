const firebaseEnvKeys = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
] as const;

export const isProduction = process.env.NODE_ENV === "production";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const firebaseConfigured = firebaseEnvKeys.every((key) => Boolean(process.env[key]));

export const demoModeEnabled =
  process.env.NEXT_PUBLIC_DEMO_MODE === "true" ||
  (!isProduction && process.env.NEXT_PUBLIC_DEMO_MODE !== "false");

export const authMode = firebaseConfigured
  ? "firebase"
  : demoModeEnabled
    ? "demo"
    : "setup-required";

export function getAuthSetupMessage() {
  if (authMode === "firebase") {
    return "Authenticate with your Firebase account to access the workspace.";
  }

  if (authMode === "demo") {
    return "Demo mode — no real authentication. Your data is stored locally.";
  }

  return "Firebase environment variables are missing. Set them in your Vercel dashboard to enable production auth.";
}
