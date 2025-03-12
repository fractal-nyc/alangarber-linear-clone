import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Theme, ThemeInput, ThemeStore } from "../types";

// Default themes
const defaultThemes: Record<string, Theme> = {
  light: {
    id: "light",
    name: "Light",
    background: "#ffffff",
    text: "#333333",
    primary: "#0070f3",
    secondary: "#6c757d",
    accent: "#ff7b00",
  },
  dark: {
    id: "dark",
    name: "Dark",
    background: "#121212",
    text: "#e0e0e0",
    primary: "#0099ff",
    secondary: "#909090",
    accent: "#ff9500",
  },
};

const useThemeStore = create<ThemeStore>()(
  persist(
    immer((set, get) => ({
      // Theme collection
      themes: { ...defaultThemes },

      // Current active theme
      activeThemeId: "light",

      // Get current theme
      getActiveTheme: () => {
        const { themes, activeThemeId } = get();
        return themes[activeThemeId] || themes.light;
      },

      // Set active theme
      setActiveTheme: (themeId: string) =>
        set((state) => {
          if (state.themes[themeId]) {
            state.activeThemeId = themeId;
          }
        }),

      // Add a new theme
      addTheme: (theme: ThemeInput) => {
        const id = theme.id || `custom-${Date.now()}`;
        set((state) => {
          state.themes[id] = {
            id,
            name: theme.name || "Custom Theme",
            background: theme.background || "#ffffff",
            text: theme.text || "#333333",
            primary: theme.primary || "#0070f3",
            secondary: theme.secondary || "#6c757d",
            accent: theme.accent || "#ff7b00",
          };
        });
        return id;
      },

      // Update theme
      updateTheme: (id: string, updates: Partial<Theme>) =>
        set((state) => {
          if (state.themes[id]) {
            state.themes[id] = { ...state.themes[id], ...updates };
          }
        }),

      // Delete theme (prevent deleting default themes)
      deleteTheme: (id: string) =>
        set((state) => {
          if (id !== "light" && id !== "dark" && state.themes[id]) {
            if (state.activeThemeId === id) {
              state.activeThemeId = "light";
            }
            delete state.themes[id];
          }
        }),
    })),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useThemeStore;
