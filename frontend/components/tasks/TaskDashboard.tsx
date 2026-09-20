"use client";

import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/types/api";
import { StatusFilter } from "@/components/tasks/StatusFilter";
import { TaskList } from "@/components/tasks/TaskList";

export function TaskDashboard() {
  const {
    filteredTasks,
    filter,
    loading,
    error,
    updatingTaskId,
    setFilter,
    fetchTasks,
    updateTaskStatus,
  } = useTasks();

  const handleToggle = (task: Task) => {
    updateTaskStatus(task.id, !task.completed);
  };

  return (
    <section className="stack">
      <div className="page-header">
        <h1>Task Dashboard</h1>
        <p>View and manage all tasks by status.</p>
      </div>

      <StatusFilter value={filter} onChange={setFilter} />

      {loading && !error && (
        <div className="state-panel">Loading tasks…</div>
      )}

      {error && (
        <div className="error-panel">
          <p style={{ margin: 0 }}>{error}</p>
          <button type="button" className="button" onClick={fetchTasks}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <TaskList tasks={filteredTasks} updatingTaskId={updatingTaskId} onToggle={handleToggle} />
      )}
    </section>
  );
}
