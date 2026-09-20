"use client";

import { useReports } from "@/hooks/useReports";

function ReportCard({ title, value, highlight }: { title: string; value: number; highlight?: boolean }) {
  return (
    <div
      className="card"
      style={{ padding: "1.25rem 1.5rem", borderTop: highlight ? "3px solid var(--color-primary)" : undefined }}
    >
      <div
        className="text-muted"
        style={{ marginBottom: "0.5rem", fontSize: "12px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}
      >
        {title}
      </div>
      <div style={{ fontSize: "28px", fontWeight: 600, lineHeight: 1, color: "var(--color-text)", letterSpacing: "-0.02em" }}>
        {value}
      </div>
    </div>
  );
}

function StatusBar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "4px" }}>
        <span style={{ fontWeight: 500 }}>{label}</span>
        <span className="text-muted">
          {count} ({percentage.toFixed(0)}%)
        </span>
      </div>
      <div style={{ width: "100%", height: "8px", backgroundColor: "var(--color-border)", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ width: `${percentage}%`, height: "100%", backgroundColor: color, transition: "width 0.3s ease" }} />
      </div>
    </div>
  );
}

export default function ReportsPage() {
  const { summary, loading, error } = useReports();

  return (
    <main>
      <div className="page-header">
        <h1>Reports</h1>
        <p>Summary statistics for tasks and recent activity.</p>
      </div>

      {error && (
        <div className="error-panel" style={{ marginBottom: "1rem" }}>
          <p style={{ margin: 0 }}>{error}</p>
        </div>
      )}

      {loading && !error && <div className="state-panel">Loading reports…</div>}

      {!loading && !error && summary && (
        <div className="stack" style={{ gap: "2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            <ReportCard title="Total Tasks" value={summary.total} highlight />
            <ReportCard title="Recent Activity" value={summary.recentActivityCount} />
          </div>

          <div className="card" style={{ padding: "1.5rem" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, margin: "0 0 1.25rem 0", color: "var(--color-text)" }}>
              Tasks by Status
            </h2>
            <StatusBar label="Todo" count={summary.byStatus.todo} total={summary.total} color="var(--color-text-muted)" />
            <StatusBar label="In Progress" count={summary.byStatus["in-progress"]} total={summary.total} color="var(--color-primary)" />
            <StatusBar label="Done" count={summary.byStatus.done} total={summary.total} color="var(--color-success)" />
          </div>
        </div>
      )}
    </main>
  );
}
