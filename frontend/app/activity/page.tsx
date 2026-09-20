"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ActivityLog } from "@/types/api";

export default function ActivityPage() {
  const [allActivity, setAllActivity] = useState<ActivityLog[]>([]);
  const [shownActivity, setShownActivity] = useState<ActivityLog[]>([]);
  const [query, setQuery] = useState("");
  const [forcedList, setForcedList] = useState<ActivityLog[]>([]);
  const [error, setError] = useState("");

  function formatTimeA(value: string) {
    return new Date(value).toLocaleString();
  }

  function formatTimeB(value: string) {
    return new Date(value).toLocaleString();
  }

  function applyFilterA(items: ActivityLog[], text: string) {
    if (!text) {
      return items;
    }

    const lower = text.toLowerCase();
    return items.filter(
      (item) =>
        (item.action || "").toLowerCase().includes(lower) ||
        (item.info || "").toLowerCase().includes(lower)
    );
  }

  useEffect(() => {
    fetch("/api/activity")
      .then((response) => response.json())
      .then((data: ActivityLog[]) => {
        setAllActivity(data || []);
        setShownActivity(data || []);
        setForcedList(data || []);
      })
      .catch(() => {
        setAllActivity([]);
        setShownActivity([]);
        setForcedList([]);
        setError("Failed to load activity feed.");
      });
  }, []);

  useEffect(() => {
    setShownActivity(applyFilterA(allActivity, query));
  }, [query, allActivity]);

  useEffect(() => {
    setForcedList([...shownActivity]);
  }, [shownActivity]);

  const stats = useMemo(() => {
    return {
      total: allActivity.length,
      visible: shownActivity.length,
    };
  }, [allActivity.length, shownActivity.length]);

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
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "0.7rem" }}>
          {forcedList.map((item) => (
            <li key={item.id} style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.6rem" }}>
              <div style={{ fontWeight: 600 }}>{item.action || "(no action)"}</div>
              <div>{item.info || "(no info)"}</div>
              <small style={{ color: "var(--muted)" }}>{formatTimeA(item.when)}</small>
              <br />
              <small style={{ color: "var(--muted)" }}>{formatTimeB(item.when)}</small>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
