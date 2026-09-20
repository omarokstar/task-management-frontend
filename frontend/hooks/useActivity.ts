import { useEffect, useMemo, useState } from "react";
import type { ActivityLog } from "@/types/api";

export function useActivity() {
  const [allActivity, setAllActivity] = useState<ActivityLog[]>([]);
  const [shownActivity, setShownActivity] = useState<ActivityLog[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/activity")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data: ActivityLog[]) => {
        setAllActivity(data || []);
        setShownActivity(data || []);
        setError("");
      })
      .catch(() => {
        setAllActivity([]);
        setShownActivity([]);
        setError("Failed to load activity feed.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!query) {
      setShownActivity(allActivity);
      return;
    }
    
    const lower = query.toLowerCase();
    const filtered = allActivity.filter(
      (item) =>
        (item.action || "").toLowerCase().includes(lower) ||
        (item.info || "").toLowerCase().includes(lower)
    );
    setShownActivity(filtered);
  }, [query, allActivity]);

  const stats = useMemo(() => {
    return {
      total: allActivity.length,
      visible: shownActivity.length,
    };
  }, [allActivity.length, shownActivity.length]);

  return {
    activity: shownActivity,
    query,
    setQuery,
    stats,
    error,
    loading,
  };
}
