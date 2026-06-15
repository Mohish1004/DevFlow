import { cookies } from "next/headers";

import { AppearanceController } from "@/components/workspace/AppearanceController";
import { CommandPalette } from "@/components/workspace/CommandPalette";
import { ContextPanel } from "@/components/workspace/ContextPanel";
import { ProtectedAppShell } from "@/components/workspace/ProtectedAppShell";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasSession = cookies().get("devflow_demo_session")?.value === "1";

  return (
    <>
      <AppearanceController />
      <CommandPalette />
      <ContextPanel />
      <ProtectedAppShell hasSession={hasSession}>{children}</ProtectedAppShell>
    </>
  );
}
