import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import useTaskStore from "../store/taskStore";
import useThemeStore from "../store/themeStore";
import { TaskStatus } from "../types";

interface TaskEditFormProps {
  taskId: string;
  onClose: () => void;
}

interface FormData {
  title: string;
  description: string;
  status: TaskStatus;
  themeId: string;
}

function TaskEditForm({ taskId, onClose }: TaskEditFormProps) {
  const { tasks, updateTask, updateTaskStatus } = useTaskStore();
  const { themes } = useThemeStore();

  // Find the task
  const task = tasks.find((t) => t.id === taskId);

  // Local state for form
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    status: TaskStatus.PENDING,
    themeId: "",
  });

  // Initialize form with task data
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        themeId: task.themeId,
      });
    }
  }, [task]);

  // If task not found, close the form
  if (!task) {
    onClose();
    return null;
  }

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Update task with form data
    updateTask(taskId, {
      title: formData.title,
      description: formData.description,
      themeId: formData.themeId,
    });

    // Update status separately if changed
    if (formData.status !== task.status) {
      updateTaskStatus(taskId, formData.status);
    }

    // Close the form
    onClose();
  };

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Status options for select
  const statusOptions = [
    { value: TaskStatus.PENDING, label: "Pending" },
    { value: TaskStatus.IN_PROGRESS, label: "In Progress" },
    { value: TaskStatus.COMPLETED, label: "Completed" },
    { value: TaskStatus.ARCHIVED, label: "Archived" },
  ];

  return (
    <div className="task-edit-form">
      <h2>Edit Task</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="themeId">Theme</label>
          <select
            id="themeId"
            name="themeId"
            value={formData.themeId}
            onChange={handleChange}
          >
            {Object.values(themes).map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskEditForm;
