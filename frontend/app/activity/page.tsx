"use client";

import { useActivity } from "@/hooks/useActivity";
import { ActivityList } from "@/components/activity/ActivityList";

export default function ActivityPage() {
  const { activity, query, setQuery, stats, error, loading } = useActivity();

  return (
    <main>
      <div className="page-header">
        <h1>Activity Feed</h1>
        <p>Browse and search recent activity logs.</p>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <input
            className="input"
            placeholder="Search by action or info…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search activity"
          />
        </div>
        <div className="text-muted" style={{ whiteSpace: "nowrap" }}>
          {stats.visible} of {stats.total}
        </div>
      </div>

      {error && (
        <div className="error-panel" style={{ marginBottom: "1rem" }}>
          <p style={{ margin: 0 }}>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="state-panel">Loading activity…</div>
      ) : (
        <ActivityList items={activity} />
      )}
    </main>
  );
}
