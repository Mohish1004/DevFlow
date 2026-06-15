const firebaseEnvKeys = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
] as const;

export const isProduction = process.env.NODE_ENV === "production";

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
    return null;
  }

  if (authMode === "demo") {
    return "Demo auth is enabled in development. Real Firebase auth must replace this before production.";
  }

  return "Firebase environment variables are missing. Production auth must be configured before protected app routes can be used honestly.";
}
