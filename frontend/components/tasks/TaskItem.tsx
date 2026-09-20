import type { Task } from "@/types/api";

type TaskItemProps = {
  task: Task;
  busy: boolean;
  onToggle: (task: Task) => void;
};

export function TaskItem({ task, busy, onToggle }: TaskItemProps) {
  const badgeClass = task.completed ? "badge badge-done" : "badge badge-todo";
  const buttonClass = task.completed ? "button" : "button primary";

  return (
    <li className="list-row" style={{ gap: "1rem" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          className="text-sm font-medium"
          style={{ marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {task.title}
        </div>
        <div className="text-xs text-muted">
          Updated {new Date(task.updatedAt).toLocaleString()}
        </div>
      </div>

      <span className={badgeClass} style={{ flexShrink: 0 }}>
        {task.completed ? "Completed" : "Pending"}
      </span>

      <button
        type="button"
        className={buttonClass}
        onClick={() => onToggle(task)}
        disabled={busy}
        aria-label={`Mark ${task.title} as ${task.completed ? "pending" : "completed"}`}
        style={{ flexShrink: 0 }}
      >
        {busy ? "Saving…" : task.completed ? "Mark Pending" : "Mark Complete"}
      </button>
    </li>
  );
}
