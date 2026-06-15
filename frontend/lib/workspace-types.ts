export type AccountType =
  | "team_leader"
  | "team_member"
  | "solo_user"
  | "organization_admin";

export type TaskStatus =
  | "Not Started"
  | "Pending"
  | "Started"
  | "In Progress"
  | "Yet To Complete"
  | "Submitted"
  | "Under Review"
  | "Changes Required"
  | "Completed"
  | "Approved";

export type ReviewStatus =
  | "Waiting for Review"
  | "Reviewing"
  | "Changes Required"
  | "Approved"
  | "Rejected"
  | "Merged";

export type WorkspaceUser = {
  accountType: AccountType;
  displayName: string;
  email: string;
  joinLink?: string;
  mode: "demo" | "firebase";
  organizationName?: string;
  teamCode?: string;
  teamName?: string;
};

export type TaskCheckpoint = {
  completed: boolean;
  id: string;
  title: string;
};

export type TaskItem = {
  assignee: string;
  comments: number;
  createdAt: string;
  deadline: string;
  description: string;
  githubLink: string;
  id: string;
  priority: "Low" | "Medium" | "High";
  status: TaskStatus;
  title: string;
  updatedAt: string;
  checkpoints: TaskCheckpoint[];
};

export type ReviewItem = {
  githubLink: string;
  id: string;
  message: string;
  reviewer: string;
  status: ReviewStatus;
  submittedAt: string;
  submittedBy: string;
  taskTitle: string;
};

export type ThemeMode = "light" | "minimalist" | "dark" | "darker";
export type FontStyle = "dm-sans" | "mono" | "system";

export type AppearanceSettings = {
  accentColor: string;
  borderGlow: boolean;
  cardColor: string;
  fontStyle: FontStyle;
  glassIntensity: number;
  graphColor: string;
  textColor: string;
  themeMode: ThemeMode;
};
