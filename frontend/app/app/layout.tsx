import { AppearanceController } from "@/components/workspace/AppearanceController";
import { CommandPalette } from "@/components/workspace/CommandPalette";
import { ContextPanel } from "@/components/workspace/ContextPanel";
import { ProtectedAppShell } from "@/components/workspace/ProtectedAppShell";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppearanceController />
      <CommandPalette />
      <ContextPanel />
      <ProtectedAppShell>{children}</ProtectedAppShell>
    </>
  );
}
