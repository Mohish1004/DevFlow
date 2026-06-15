"use client";

import { BarChart3 } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { EmptyState } from "@/components/workspace/EmptyState";
import { PageHeader } from "@/components/workspace/PageHeader";
import { analyticsSeries } from "@/lib/workspace-data";

export function AnalyticsWorkspace() {
  return (
    <div className="space-y-6">
      <PageHeader
        description="Analytics must stay clearly demo-labeled until real backend signals are connected. Fake performance data should never be mistaken for live telemetry."
        eyebrow="Analytics"
        showDemoBadge
        title="Workspace analytics with honest demo labeling"
      />
      <div className="workspace-card rounded-[1.75rem] p-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-5 w-5 text-white/70" />
          <p className="text-xl font-semibold tracking-[-0.04em]">Velocity trend</p>
        </div>
        <div className="mt-6 h-72">
          <ResponsiveContainer height="100%" width="100%">
            <LineChart data={analyticsSeries}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis axisLine={false} dataKey="label" tick={{ fill: "rgba(255,255,255,0.6)" }} tickLine={false} />
              <Tooltip />
              <Line
                dataKey="velocity"
                dot={false}
                stroke="var(--workspace-graph)"
                strokeWidth={3}
                type="monotone"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <EmptyState
        description="No backend-derived trend comparisons are available yet. Once the Java API is live, these charts should bind to real team data."
        title="No live benchmark comparisons yet"
      />
    </div>
  );
}
