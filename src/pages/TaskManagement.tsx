import { useState, FormEvent, ChangeEvent } from "react";
import useTaskStore from "../store/taskStore";
import useThemeStore from "../store/themeStore";
import { TaskInput } from "../types";

function TaskManagement() {
  const { tasks, addTask, updateTask, deleteTask } = useTaskStore();
  const { themes, activeThemeId } = useThemeStore();

  // Local state for new task form
  const [newTask, setNewTask] = useState<TaskInput>({
    title: "",
    description: "",
    themeId: activeThemeId,
  });

  // State for editing title inline
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

  // Handle creating a new task
  const handleCreateTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask.title.trim() === "") return;

    addTask(newTask);

    // Reset form
    setNewTask({
      title: "",
      description: "",
      themeId: activeThemeId,
    });
  };

  // Begin editing task title
  const startEditingTitle = (taskId: string, currentTitle: string) => {
    setEditingTaskId(taskId);
    setEditTitle(currentTitle);
  };

  // Save edited title
  const saveEditedTitle = (id: string) => {
    if (editTitle.trim() !== "") {
      updateTask(id, { title: editTitle });
    }
    setEditingTaskId(null);
  };

  // Handle inputs for new task form
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="task-management">
      <div className="management-section">
        <h2>Create Task</h2>
        <form onSubmit={handleCreateTask} className="task-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="themeId">Theme</label>
            <select
              id="themeId"
              name="themeId"
              value={newTask.themeId}
              onChange={handleInputChange}
            >
              {Object.values(themes).map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn create-btn">
            Create Task
          </button>
        </form>
      </div>

      <div className="management-section">
        <h2>All Tasks</h2>
        <div className="all-tasks-list">
          {tasks.length === 0 ? (
            <div className="no-tasks">No tasks created yet</div>
          ) : (
            tasks.map((task) => {
              const taskTheme = themes[task.themeId] || themes.light;

              return (
                <div
                  key={task.id}
                  className="task-row"
                  style={{
                    borderLeft: `4px solid ${taskTheme.accent}`,
                  }}
                >
                  {editingTaskId === task.id ? (
                    <div className="inline-edit">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        autoFocus
                      />
                      <button onClick={() => saveEditedTitle(task.id)}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <div
                      className="task-title"
                      onClick={() => startEditingTitle(task.id, task.title)}
                    >
                      {task.title}
                    </div>
                  )}

                  <div className="task-actions">
                    <span
                      className="theme-indicator"
                      style={{ backgroundColor: taskTheme.accent }}
                    >
                      {taskTheme.name}
                    </span>
                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskManagement;
