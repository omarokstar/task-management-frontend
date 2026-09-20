import type { ActivityLog } from "@/types/api";
import { ActivityItem } from "@/components/activity/ActivityItem";

type ActivityListProps = {
  items: ActivityLog[];
};

export function ActivityList({ items }: ActivityListProps) {
  if (items.length === 0) {
    return <p style={{ margin: 0, color: "var(--muted)" }}>No activity found.</p>;
  }

  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "0.7rem" }}>
      {items.map((item) => (
        <ActivityItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
