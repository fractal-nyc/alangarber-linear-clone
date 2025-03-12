// Task Status Enum
export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
  ARCHIVED = "archived",
}

// Task Interface
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  themeId: string;
  createdAt: string;
}

// New Task Input Interface
export interface TaskInput {
  title: string;
  description: string;
  themeId?: string;
}

// Task Update Interface
export interface TaskUpdate {
  title?: string;
  description?: string;
  status?: TaskStatus;
  themeId?: string;
}

// Theme Interface
export interface Theme {
  id: string;
  name: string;
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
}

// New Theme Input Interface
export interface ThemeInput {
  id?: string;
  name: string;
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
}

// Task Store State Interface
export interface TaskStore {
  tasks: Task[];
  addTask: (task: TaskInput) => void;
  updateTask: (id: string, updates: TaskUpdate) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
}

// Theme Store State Interface
export interface ThemeStore {
  themes: Record<string, Theme>;
  activeThemeId: string;
  getActiveTheme: () => Theme;
  setActiveTheme: (themeId: string) => void;
  addTheme: (theme: ThemeInput) => string;
  updateTheme: (id: string, updates: Partial<Theme>) => void;
  deleteTheme: (id: string) => void;
}
