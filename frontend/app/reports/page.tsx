"use client";

import Link from "next/link";
import { useReports } from "@/hooks/useReports";

function ReportCard({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="card" style={{ padding: "1.5rem", textAlign: "center", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <h3 style={{ margin: 0, color: "var(--muted)", fontSize: "1rem", fontWeight: "normal" }}>{title}</h3>
      <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--text)", lineHeight: 1 }}>{value}</div>
    </div>
  );
}

export default function ReportsPage() {
  const { summary, loading, error } = useReports();

  return (
    <main className="stack">
      <nav>
        <Link href="/" className="button">
          Back
        </Link>
      </nav>

      <section className="card" style={{ padding: "1rem" }}>
        <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Reports Dashboard</h1>
        <p style={{ margin: 0, color: "var(--muted)" }}>Summary statistics for tasks and activity.</p>
      </section>

      {error && (
        <section className="card" style={{ padding: "1rem", borderColor: "#e3b4c0", background: "#fff8fa" }}>
          <p style={{ margin: 0, color: "var(--danger)" }}>{error}</p>
        </section>
      )}

      {loading && !error && (
        <section className="card" style={{ padding: "1rem" }}>
          <p style={{ margin: 0, color: "var(--muted)" }}>Loading reports...</p>
        </section>
      )}

      {!loading && !error && summary && (
        <section className="stack">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            <ReportCard title="Total Tasks" value={summary.total} />
            <ReportCard title="Recent Activity" value={summary.recentActivityCount} />
          </div>
          
          <div className="card" style={{ padding: "1.5rem" }}>
            <h2 style={{ marginTop: 0, marginBottom: "1.5rem", fontSize: "1.25rem" }}>Tasks by Status</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
              <ReportCard title="Todo" value={summary.byStatus.todo} />
              <ReportCard title="In Progress" value={summary.byStatus["in-progress"]} />
              <ReportCard title="Done" value={summary.byStatus.done} />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
