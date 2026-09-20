import type { Task } from "@/types/api";
import { TaskItem } from "@/components/tasks/TaskItem";

type TaskListProps = {
  tasks: Task[];
  updatingTaskId: string;
  onToggle: (task: Task) => void;
};

export function TaskList({ tasks, updatingTaskId, onToggle }: TaskListProps) {
  if (tasks.length === 0) {
    return <div className="state-panel">No tasks match this filter.</div>;
  }

  return (
    <section
      aria-label="Task list"
      style={{ borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}
    >
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} busy={updatingTaskId === task.id} onToggle={onToggle} />
        ))}
      </ul>
    </section>
  );
}
