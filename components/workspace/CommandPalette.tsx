"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { appNavItems } from "@/lib/workspace-data";
import { useUiStore } from "@/stores/ui-store";

export function CommandPalette() {
  const [query, setQuery] = useState("");
  const { closeCommandPalette, commandPaletteOpen, setCommandPaletteOpen } = useUiStore();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }

      if (event.key === "Escape") {
        closeCommandPalette();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeCommandPalette, commandPaletteOpen, setCommandPaletteOpen]);

  const filteredItems = useMemo(() => {
    const lower = query.trim().toLowerCase();
    if (!lower) {
      return appNavItems;
    }

    return appNavItems.filter((item) => item.label.toLowerCase().includes(lower));
  }, [query]);

  if (!commandPaletteOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] bg-black/50 p-4 backdrop-blur-sm">
      <div className="liquid-glass mx-auto mt-20 max-w-2xl rounded-[1.75rem] p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <Search className="h-4 w-4 text-white/60" />
          <input
            autoFocus
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search routes or jump to a workspace area"
            value={query}
          />
        </div>
        <div className="mt-4 grid gap-2">
          {filteredItems.map((item) => (
            <Link
              className="rounded-2xl px-4 py-3 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
              href={item.href}
              key={item.href}
              onClick={closeCommandPalette}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
