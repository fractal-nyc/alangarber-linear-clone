import { useState, FormEvent, ChangeEvent } from "react";
import useThemeStore from "../store/themeStore";
import { ThemeInput } from "../types";

function ThemeCreator() {
  const { addTheme, setActiveTheme } = useThemeStore();

  // Initial theme state
  const [newTheme, setNewTheme] = useState<ThemeInput>({
    name: "",
    background: "#ffffff",
    text: "#333333",
    primary: "#0070f3",
    secondary: "#6c757d",
    accent: "#ff7b00",
  });

  // Handle theme creation
  const handleCreateTheme = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTheme.name.trim() === "") {
      alert("Please provide a theme name");
      return;
    }

    // Add to store and get the new theme ID
    const themeId = addTheme(newTheme);

    // Activate the new theme
    setActiveTheme(themeId);

    // Reset form
    setNewTheme({
      name: "",
      background: "#ffffff",
      text: "#333333",
      primary: "#0070f3",
      secondary: "#6c757d",
      accent: "#ff7b00",
    });
  };

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTheme((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="theme-creator">
      <form onSubmit={handleCreateTheme}>
        <div className="form-group">
          <label htmlFor="name">Theme Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newTheme.name}
            onChange={handleInputChange}
            placeholder="My Custom Theme"
            required
          />
        </div>

        <div className="color-pickers">
          <div className="color-field">
            <label htmlFor="background">Background</label>
            <div className="color-input-group">
              <input
                type="color"
                id="background"
                name="background"
                value={newTheme.background}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="background"
                value={newTheme.background}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="color-field">
            <label htmlFor="text">Text</label>
            <div className="color-input-group">
              <input
                type="color"
                id="text"
                name="text"
                value={newTheme.text}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="text"
                value={newTheme.text}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="color-field">
            <label htmlFor="primary">Primary</label>
            <div className="color-input-group">
              <input
                type="color"
                id="primary"
                name="primary"
                value={newTheme.primary}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="primary"
                value={newTheme.primary}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="color-field">
            <label htmlFor="secondary">Secondary</label>
            <div className="color-input-group">
              <input
                type="color"
                id="secondary"
                name="secondary"
                value={newTheme.secondary}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="secondary"
                value={newTheme.secondary}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="color-field">
            <label htmlFor="accent">Accent</label>
            <div className="color-input-group">
              <input
                type="color"
                id="accent"
                name="accent"
                value={newTheme.accent}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="accent"
                value={newTheme.accent}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div
          className="theme-preview"
          style={{
            backgroundColor: newTheme.background,
            color: newTheme.text,
            border: `1px solid ${newTheme.secondary}`,
            padding: "15px",
            borderRadius: "5px",
            marginBottom: "15px",
          }}
        >
          <h3 style={{ color: newTheme.primary }}>Theme Preview</h3>
          <p>This is how your theme will look.</p>
          <button
            style={{
              backgroundColor: newTheme.primary,
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              borderRadius: "3px",
            }}
            type="button"
          >
            Primary Button
          </button>
          <button
            style={{
              backgroundColor: newTheme.secondary,
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              borderRadius: "3px",
              marginLeft: "10px",
            }}
            type="button"
          >
            Secondary Button
          </button>
          <div
            style={{
              backgroundColor: newTheme.accent,
              width: "100%",
              height: "10px",
              marginTop: "10px",
            }}
          ></div>
        </div>

        <button type="submit" className="btn create-theme-btn">
          Create Theme
        </button>
      </form>
    </div>
  );
}

export default ThemeCreator;
