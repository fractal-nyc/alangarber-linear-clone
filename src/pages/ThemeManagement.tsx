import useThemeStore from "../store/themeStore";
import ThemeCreator from "../components/ThemeCreator";
import { Theme } from "../types";

function ThemeManagement() {
  const { themes, activeThemeId, setActiveTheme, deleteTheme } =
    useThemeStore();

  return (
    <div className="theme-management">
      <div className="management-section">
        <h2>Themes</h2>
        <div className="themes-management">
          <div className="theme-list">
            <h3>Your Themes</h3>
            <div className="themes-grid">
              {Object.values(themes).map((theme: Theme) => (
                <div
                  key={theme.id}
                  className={`theme-card ${theme.id === activeThemeId ? "active-theme" : ""}`}
                  style={{
                    backgroundColor: theme.background,
                    color: theme.text,
                    border: `1px solid ${theme.secondary}`,
                    boxShadow:
                      theme.id === activeThemeId
                        ? `0 0 0 2px ${theme.primary}`
                        : "none",
                  }}
                >
                  <div className="theme-card-header">
                    <h4 style={{ color: theme.primary }}>{theme.name}</h4>
                    {theme.id === activeThemeId && (
                      <span
                        className="active-label"
                        style={{ backgroundColor: theme.accent }}
                      >
                        Active
                      </span>
                    )}
                  </div>

                  <div className="color-preview">
                    <div
                      className="color-pill"
                      style={{ backgroundColor: theme.primary }}
                      title="Primary"
                    ></div>
                    <div
                      className="color-pill"
                      style={{ backgroundColor: theme.secondary }}
                      title="Secondary"
                    ></div>
                    <div
                      className="color-pill"
                      style={{ backgroundColor: theme.accent }}
                      title="Accent"
                    ></div>
                  </div>

                  <div className="theme-card-actions">
                    <button
                      className="use-theme-btn"
                      style={{ backgroundColor: theme.primary, color: "#fff" }}
                      onClick={() => setActiveTheme(theme.id)}
                    >
                      {theme.id === activeThemeId
                        ? "Current Theme"
                        : "Use Theme"}
                    </button>

                    {theme.id !== "light" && theme.id !== "dark" && (
                      <button
                        className="delete-theme-btn"
                        onClick={() => deleteTheme(theme.id)}
                        style={{ color: theme.text }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="theme-creator-section">
            <h3>Create New Theme</h3>
            <ThemeCreator />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeManagement;
