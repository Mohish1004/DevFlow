import type { AppearanceSettings, ReviewItem, TaskItem } from "@/lib/workspace-types";

export const appNavItems = [
  { href: "/app/dashboard", label: "Dashboard" },
  { href: "/app/projects", label: "Projects" },
  { href: "/app/tasks", label: "Tasks" },
  { href: "/app/review", label: "Review" },
  { href: "/app/docs", label: "Docs" },
  { href: "/app/meet", label: "Meet" },
  { href: "/app/analytics", label: "Analytics" },
  { href: "/app/integrations", label: "Integrations" },
  { href: "/app/admin", label: "Admin" },
  { href: "/app/assistant", label: "Assistant" },
  { href: "/app/settings", label: "Settings" },
] as const;

export const suggestedAssistantPrompts = [
  "Summarize sprint risks for this week",
  "Draft a review checklist for the auth feature",
  "Turn release blockers into action items",
] as const;

export const defaultAppearance: AppearanceSettings = {
  accentColor: "#a764ff",
  borderGlow: true,
  cardColor: "rgba(255,255,255,0.06)",
  fontStyle: "dm-sans",
  glassIntensity: 20,
  graphColor: "#8b7be8",
  textColor: "#f5f5f6",
  themeMode: "dark",
};

export const initialTasks: TaskItem[] = [
  {
    assignee: "Ava",
    comments: 4,
    createdAt: "2026-06-10T10:00:00Z",
    deadline: "2026-06-18",
    description:
      "Ship the Firebase token handoff to the Java backend and surface auth setup status honestly.",
    githubLink: "https://github.com/example/devflow/pull/184",
    id: "task-auth-handoff",
    priority: "High",
    status: "Under Review",
    title: "Auth handoff to Spring filter",
    updatedAt: "2026-06-15T11:00:00Z",
    checkpoints: [
      { completed: true, id: "cp-auth-1", title: "Frontend sends bearer token" },
      { completed: true, id: "cp-auth-2", title: "Setup warning copy added" },
      { completed: false, id: "cp-auth-3", title: "Backend verification contract documented" },
    ],
  },
  {
    assignee: "Mira",
    comments: 2,
    createdAt: "2026-06-11T09:00:00Z",
    deadline: "2026-06-19",
    description:
      "Add local task persistence so list, kanban, and timeline views reflect the same source of truth.",
    githubLink: "https://github.com/example/devflow/issues/221",
    id: "task-persistent-store",
    priority: "High",
    status: "In Progress",
    title: "Persistent task workspace store",
    updatedAt: "2026-06-15T09:30:00Z",
    checkpoints: [
      { completed: true, id: "cp-task-1", title: "Task type model defined" },
      { completed: false, id: "cp-task-2", title: "Kanban status mapping added" },
      { completed: false, id: "cp-task-3", title: "Timeline grouping polished" },
    ],
  },
  {
    assignee: "Nia",
    comments: 1,
    createdAt: "2026-06-12T14:00:00Z",
    deadline: "2026-06-20",
    description:
      "Prepare the team-code onboarding flow for member invites and join-link distribution.",
    githubLink: "https://github.com/example/devflow/pull/203",
    id: "task-team-code",
    priority: "Medium",
    status: "Pending",
    title: "Team code onboarding preview",
    updatedAt: "2026-06-14T18:00:00Z",
    checkpoints: [
      { completed: false, id: "cp-team-1", title: "Generate demo code" },
      { completed: false, id: "cp-team-2", title: "Join route prefills code" },
      { completed: false, id: "cp-team-3", title: "Copy join link action" },
    ],
  },
];

export const initialReviews: ReviewItem[] = [
  {
    githubLink: "https://github.com/example/devflow/pull/184",
    id: "review-auth-handoff",
    message: "Backend token verification copy is ready. Need security review before merge.",
    reviewer: "Jordan",
    status: "Reviewing",
    submittedAt: "2026-06-15T08:40:00Z",
    submittedBy: "Ava",
    taskTitle: "Auth handoff to Spring filter",
  },
  {
    githubLink: "https://github.com/example/devflow/pull/203",
    id: "review-team-code",
    message: "Join link preview is wired. Waiting for admin UX comments.",
    reviewer: "Mira",
    status: "Waiting for Review",
    submittedAt: "2026-06-14T16:20:00Z",
    submittedBy: "Nia",
    taskTitle: "Team code onboarding preview",
  },
];

export const analyticsSeries = [
  { label: "Mon", velocity: 12 },
  { label: "Tue", velocity: 18 },
  { label: "Wed", velocity: 17 },
  { label: "Thu", velocity: 23 },
  { label: "Fri", velocity: 28 },
  { label: "Sat", velocity: 27 },
  { label: "Sun", velocity: 31 },
];

export const integrationCards = [
  {
    description: "Required for Review Zone repo, PR, and commit linking.",
    label: "GitHub",
    state: "Requires Backend",
  },
  {
    description: "Manual Meet links can work before Calendar automation.",
    label: "Google Meet",
    state: "UI Preview",
  },
  {
    description: "Calendar-backed scheduling comes after backend OAuth is connected.",
    label: "Google Calendar",
    state: "Requires Backend",
  },
  {
    description: "Attach workspace resources once storage and OAuth are wired.",
    label: "Google Drive",
    state: "Not Connected",
  },
] as const;

export const docsCards = [
  {
    description: "Security decisions, auth flow, API contracts, and migration notes.",
    label: "Platform Docs",
  },
  {
    description: "Shared launch notes, release checklist, and test sign-off.",
    label: "Release Notes",
  },
  {
    description: "Context-rich onboarding tied to tasks, reviews, and team activity.",
    label: "Team Playbooks",
  },
] as const;

export const meetingCards = [
  {
    label: "Sprint Review",
    time: "Today · 5:30 PM",
    url: "https://meet.google.com/demo-sprint-review",
  },
  {
    label: "Architecture Sync",
    time: "Tomorrow · 11:00 AM",
    url: "https://meet.google.com/demo-architecture-sync",
  },
] as const;
