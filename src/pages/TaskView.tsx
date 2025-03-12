import { useState } from "react";
import useTaskStore from "../store/taskStore";
import useThemeStore from "../store/themeStore";
import TaskEditForm from "../components/TaskEditForm";
import { TaskStatus, Task, Theme } from "../types";

interface TabDefinition {
  id: TaskStatus;
  label: string;
}

function TaskView() {
  const [activeTab, setActiveTab] = useState<TaskStatus>(TaskStatus.PENDING);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // Get tasks filtered by active tab
  const { tasks } = useTaskStore();
  const filteredTasks = tasks.filter((task) => task.status === activeTab);

  // Get themes for coloring tasks
  const { themes } = useThemeStore();

  // Handle task selection
  const handleTaskSelect = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  // Close the task edit subview
  const handleCloseSubview = () => {
    setSelectedTaskId(null);
  };

  // Tab definition for status filters
  const tabs: TabDefinition[] = [
    { id: TaskStatus.PENDING, label: "Pending" },
    { id: TaskStatus.IN_PROGRESS, label: "In Progress" },
    { id: TaskStatus.COMPLETED, label: "Completed" },
    { id: TaskStatus.ARCHIVED, label: "Archived" },
  ];

  // Render a task card
  const renderTaskCard = (task: Task, taskTheme: Theme) => {
    return (
      <div
        key={task.id}
        className="task-card"
        onClick={() => handleTaskSelect(task.id)}
        style={{
          backgroundColor: taskTheme.background,
          color: taskTheme.text,
          borderLeft: `4px solid ${taskTheme.accent}`,
        }}
      >
        <h3>{task.title}</h3>
        <p>
          {task.description.substring(0, 100)}
          {task.description.length > 100 ? "..." : ""}
        </p>
        <div className="task-meta">
          <span
            className="theme-dot"
            style={{ backgroundColor: taskTheme.accent }}
          ></span>
          <span>{taskTheme.name}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="task-view">
      {/* Task Edit Subview */}
      {selectedTaskId && (
        <div className="task-subview">
          <div className="subview-backdrop" onClick={handleCloseSubview}></div>
          <div className="subview-content">
            <button className="close-button" onClick={handleCloseSubview}>
              ×
            </button>
            <TaskEditForm
              taskId={selectedTaskId}
              onClose={handleCloseSubview}
            />
          </div>
        </div>
      )}

      {/* Status Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="no-tasks">No tasks in this status</div>
        ) : (
          filteredTasks.map((task) => {
            const taskTheme = themes[task.themeId] || themes.light;
            return renderTaskCard(task, taskTheme);
          })
        )}
      </div>
    </div>
  );
}

export default TaskView;
