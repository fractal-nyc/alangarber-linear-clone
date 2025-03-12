import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { TaskInput, TaskStatus, TaskUpdate, TaskStore } from "../types";

const useTaskStore = create<TaskStore>()(
  persist(
    immer((set, get) => ({
      tasks: [],

      // Add a new task
      addTask: (task: TaskInput) =>
        set((state) => {
          state.tasks.push({
            id: Date.now().toString(),
            title: task.title,
            description: task.description || "",
            status: TaskStatus.PENDING,
            themeId: task.themeId || "default",
            createdAt: new Date().toISOString(),
          });
        }),

      // Update a task
      updateTask: (id: string, updates: TaskUpdate) =>
        set((state) => {
          const taskIndex = state.tasks.findIndex((task) => task.id === id);
          if (taskIndex !== -1) {
            Object.assign(state.tasks[taskIndex], updates);
          }
        }),

      // Delete a task
      deleteTask: (id: string) =>
        set((state) => {
          const taskIndex = state.tasks.findIndex((task) => task.id === id);
          if (taskIndex !== -1) {
            state.tasks.splice(taskIndex, 1);
          }
        }),

      // Update task status
      updateTaskStatus: (id: string, status: TaskStatus) =>
        set((state) => {
          const taskIndex = state.tasks.findIndex((task) => task.id === id);
          if (taskIndex !== -1) {
            state.tasks[taskIndex].status = status;
          }
        }),

      // Get tasks by status
      getTasksByStatus: (status: TaskStatus) => {
        const state = get();
        return state.tasks.filter((task) => task.status === status);
      },
    })),
    {
      name: "task-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useTaskStore;
