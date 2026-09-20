"use client";

import Link from "next/link";
import { useActivity } from "@/hooks/useActivity";
import { ActivityList } from "@/components/activity/ActivityList";

export default function ActivityPage() {
  const { activity, query, setQuery, stats, error, loading } = useActivity();

  return (
    <main className="stack">
      <nav>
        <Link href="/" className="button">
          Back
        </Link>
      </nav>

      <section className="card" style={{ padding: "1rem" }}>
        <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Activity Feed</h1>
        
        {error && (
          <p style={{ color: "var(--danger)", marginTop: 0, marginBottom: "1rem" }}>{error}</p>
        )}

        <input
          className="input"
          placeholder="Search activity"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </section>

      <section className="card" style={{ padding: "1rem" }}>
        <small style={{ color: "var(--muted)" }}>
          Total: {stats.total} | Visible: {stats.visible}
        </small>
      </section>

      <section className="card" style={{ padding: "1rem" }}>
        {loading ? (
          <p style={{ margin: 0, color: "var(--muted)" }}>Loading activity...</p>
        ) : (
          <ActivityList items={activity} />
        )}
      </section>
    </main>
  );
}
