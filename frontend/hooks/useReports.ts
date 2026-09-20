import { useEffect, useState } from "react";
import type { TasksSummary, ErrorResponse } from "@/types/api";

export function useReports() {
  const [summary, setSummary] = useState<TasksSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/reports/tasks-summary")
      .then(async (response) => {
        if (!response.ok) {
          try {
            const body = (await response.json()) as ErrorResponse;
            throw new Error(body.error?.message || `Request failed with ${response.status}`);
          } catch (e) {
            throw new Error(e instanceof Error ? e.message : `Request failed with ${response.status}`);
          }
        }
        return response.json();
      })
      .then((data: TasksSummary) => {
        setSummary(data);
        setError("");
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : "Failed to load reports summary.");
        setSummary(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { summary, loading, error };
}
