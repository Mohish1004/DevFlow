"use client";

import Link from "next/link";
import { CalendarDays, Video } from "lucide-react";

import { EmptyState } from "@/components/workspace/EmptyState";
import { PageHeader } from "@/components/workspace/PageHeader";
import { meetingCards } from "@/lib/workspace-data";

export function MeetWorkspace() {
  return (
    <div className="space-y-6">
      <PageHeader
        description="Manual Google Meet links are allowed now, but scheduling and Calendar sync must stay labeled as backend-dependent."
        eyebrow="Meet"
        showDemoBadge
        title="Meetings tied to project context"
      />
      <div className="grid gap-4 xl:grid-cols-2">
        {meetingCards.map((meeting) => (
          <div className="workspace-card rounded-[1.75rem] p-6" key={meeting.label}>
            <div className="flex items-center gap-3">
              <Video className="h-5 w-5 text-white/70" />
              <p className="text-2xl font-semibold tracking-[-0.04em]">{meeting.label}</p>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/75">
              <CalendarDays className="h-4 w-4" />
              {meeting.time}
            </div>
            <Link
              className="mt-5 inline-flex rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-white"
              href={meeting.url}
              target="_blank"
            >
              Open manual Meet link
            </Link>
          </div>
        ))}
      </div>
      <EmptyState
        description="No Calendar-backed automation is connected yet. When backend OAuth exists, scheduled meeting creation should surface here."
        title="No auto-scheduled meetings yet"
      />
    </div>
  );
}
