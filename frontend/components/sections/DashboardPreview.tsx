"use client";

import {
  Bell,
  CheckCircle2,
  CircleAlert,
  Clock3,
  FileText,
  GitPullRequest,
  LayoutDashboard,
  ListTodo,
  Rocket,
  Search,
  Users,
} from "lucide-react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const sprintVelocity = [
  { day: "Mon", value: 14 },
  { day: "Tue", value: 19 },
  { day: "Wed", value: 23 },
  { day: "Thu", value: 21 },
  { day: "Fri", value: 27 },
  { day: "Sat", value: 31 },
  { day: "Sun", value: 36 },
];

const pullRequests = [
  {
    eta: "Today",
    owner: "Alex",
    repo: "API contracts cleanup",
    status: "Ready to merge",
    tone: "text-emerald-400",
  },
  {
    eta: "2 hrs",
    owner: "Mira",
    repo: "Onboarding docs refresh",
    status: "Needs review",
    tone: "text-amber-300",
  },
  {
    eta: "Blocked",
    owner: "Sam",
    repo: "Realtime sync bugfix",
    status: "Waiting on QA",
    tone: "text-rose-400",
  },
  {
    eta: "Tomorrow",
    owner: "Nia",
    repo: "Release checklist polish",
    status: "In review",
    tone: "text-sky-300",
  },
];

const releaseSplit = [
  { color: "#ffffff", label: "Done", value: 61 },
  { color: "#c4b5fd", label: "In review", value: 24 },
  { color: "#fda4af", label: "Blocked", value: 15 },
];

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: ListTodo, label: "Sprint Board" },
  { icon: GitPullRequest, label: "Review Zone" },
  { icon: FileText, label: "Docs" },
  { icon: Rocket, label: "Releases" },
];

const focusCards = [
  { label: "Completed tasks", value: "24" },
  { label: "In review", value: "06" },
  { label: "Blockers", value: "02" },
];

function StatusDot({ className }: { className: string }) {
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${className}`} />;
}

export function DashboardPreview() {
  return (
    <section className="pb-20 md:pb-24" id="product">
      <div className="section-shell">
        <ScrollReveal>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#09090d]/95 p-3 shadow-[0_40px_120px_rgba(9,9,20,0.35)] md:p-5">
            <div className="grid gap-4 xl:grid-cols-[220px,minmax(0,1fr),320px]">
              <aside className="rounded-[1.75rem] border border-white/6 bg-[#101017] p-4 text-white/78">
                <div className="border-b border-white/6 pb-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                    DevFlow workspace
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">Product Command</h3>
                </div>
                <div className="mt-5 space-y-2">
                  {sidebarItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        className={[
                          "flex items-center justify-between rounded-2xl px-3 py-3 text-sm",
                          index === 0
                            ? "bg-white/8 text-white ring-1 ring-white/10"
                            : "text-white/58",
                        ].join(" ")}
                        key={item.label}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.label === "Review Zone" ? (
                          <span className="rounded-full bg-white/8 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-white/56">
                            3 open
                          </span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 rounded-[1.5rem] border border-white/8 bg-white/5 p-4">
                  <p className="text-sm text-white/72">Next release</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
                    v2.4 Launch
                  </p>
                  <p className="mt-2 text-xs leading-6 text-white/45">
                    Freeze window starts in 18 hours. Docs, QA, and approvals stay synced here.
                  </p>
                </div>
              </aside>
              <div className="space-y-4">
                <div className="rounded-[1.75rem] border border-white/6 bg-[#101017] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-white/55">Current sprint</p>
                      <div className="mt-2 flex items-end gap-3">
                        <span className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                          Sprint 18
                        </span>
                        <span className="pb-1 text-lg font-medium text-emerald-400">
                          On track
                        </span>
                      </div>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-white/55">
                        Planning, review, docs, and release status are unified around the same
                        engineering workstream.
                      </p>
                    </div>
                    <div className="grid min-w-[220px] gap-2 sm:grid-cols-3">
                      {focusCards.map((card) => (
                        <div
                          className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3"
                          key={card.label}
                        >
                          <p className="text-[11px] uppercase tracking-[0.18em] text-white/38">
                            {card.label}
                          </p>
                          <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
                            {card.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 h-[280px] md:h-[340px]">
                    <ResponsiveContainer height="100%" width="100%">
                      <LineChart data={sprintVelocity} margin={{ bottom: 4, left: 0, right: 0, top: 0 }}>
                        <defs>
                          <linearGradient id="devflowVelocity" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#F4F4F5" stopOpacity={1} />
                            <stop offset="100%" stopColor="#F4F4F5" stopOpacity={0.06} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#23232e" strokeDasharray="3 6" vertical={false} />
                        <XAxis
                          axisLine={false}
                          dataKey="day"
                          tick={{ fill: "#71717A", fontSize: 12 }}
                          tickLine={false}
                        />
                        <Line
                          dataKey="value"
                          dot={false}
                          fill="url(#devflowVelocity)"
                          fillOpacity={0.22}
                          stroke="#F4F4F5"
                          strokeWidth={2.5}
                          type="monotone"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="overflow-x-auto rounded-[1.75rem] border border-white/6 bg-[#101017] p-5">
                  <div className="mb-5">
                    <h3 className="text-2xl font-semibold text-white">Pull requests and docs</h3>
                  </div>
                  <table className="min-w-[640px] w-full text-left text-sm text-white/72">
                    <thead className="text-white/38">
                      <tr>
                        <th className="pb-4 font-medium">Work item</th>
                        <th className="pb-4 font-medium">Owner</th>
                        <th className="pb-4 font-medium">State</th>
                        <th className="pb-4 font-medium">ETA</th>
                        <th className="pb-4 text-right font-medium">Flow</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pullRequests.map((row) => (
                        <tr className="border-t border-white/6" key={row.repo}>
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-white/70">
                                <GitPullRequest className="h-4 w-4" />
                              </span>
                              <span className="font-medium text-white">{row.repo}</span>
                            </div>
                          </td>
                          <td className="py-4">{row.owner}</td>
                          <td className="py-4">{row.status}</td>
                          <td className="py-4">{row.eta}</td>
                          <td className={`py-4 text-right font-semibold ${row.tone}`}>
                            {row.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <aside className="space-y-4">
                <div className="rounded-[1.75rem] border border-white/6 bg-[#101017] p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-2xl font-semibold text-white">Review Queue</h3>
                    <div className="flex items-center gap-3 text-white/40">
                      <Bell className="h-4 w-4" />
                      <div className="flex items-center gap-2 rounded-full border border-white/8 bg-black/25 px-3 py-2 text-sm">
                        <Search className="h-4 w-4" />
                        <span>Search</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        note: "3 comments left before merge",
                        ticket: "PR-184  Improve release checklist",
                        tone: "emerald",
                      },
                      {
                        note: "Needs design sign-off",
                        ticket: "DOC-33  Onboarding docs update",
                        tone: "amber",
                      },
                      {
                        note: "Blocked by failing test",
                        ticket: "BUG-91  Webhook retry flow",
                        tone: "rose",
                      },
                    ].map((item) => (
                      <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-4" key={item.ticket}>
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-sm font-medium leading-6 text-white">
                            {item.ticket}
                          </span>
                          {item.tone === "emerald" ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : item.tone === "amber" ? (
                            <Clock3 className="h-4 w-4 text-amber-300" />
                          ) : (
                            <CircleAlert className="h-4 w-4 text-rose-400" />
                          )}
                        </div>
                        <p className="mt-3 text-sm text-white/45">{item.note}</p>
                      </div>
                    ))}
                  </div>
                  <a
                    className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white transition hover:brightness-110"
                    href="/login"
                  >
                    Open Review Zone
                  </a>
                </div>
                <div className="rounded-[1.75rem] border border-white/6 bg-[#101017] p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold text-white">Release Readiness</h3>
                    <span className="rounded-full bg-white/6 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/45">
                      Live
                    </span>
                  </div>
                  <div className="mt-4 h-56">
                    <ResponsiveContainer height="100%" width="100%">
                      <PieChart>
                        <Pie
                          data={releaseSplit}
                          dataKey="value"
                          innerRadius={54}
                          outerRadius={86}
                          paddingAngle={4}
                          stroke="rgba(255,255,255,0.06)"
                          strokeWidth={2}
                        >
                          {releaseSplit.map((entry) => (
                            <Cell fill={entry.color} key={entry.label} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 grid gap-2">
                    {releaseSplit.map((entry) => (
                      <div className="flex items-center justify-between text-sm text-white/68" key={entry.label}>
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                          {entry.label}
                        </div>
                        <span>{entry.value}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-[1.5rem] border border-white/8 bg-white/5 p-4">
                    <p className="text-sm text-white/55">Team pulse</p>
                    <div className="mt-3 flex items-center justify-between text-sm text-white/72">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Standups posted
                      </div>
                      <span>12/12</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm text-white/72">
                      <div className="flex items-center gap-2">
                        <StatusDot className="bg-emerald-400" />
                        Docs synced
                      </div>
                      <span>Healthy</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm text-white/72">
                      <div className="flex items-center gap-2">
                        <StatusDot className="bg-amber-300" />
                        Release blockers
                      </div>
                      <span>2 active</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
