import type { ActivityLog } from "@/types/api";
import { ActivityItem } from "@/components/activity/ActivityItem";

type ActivityListProps = {
  items: ActivityLog[];
};

export function ActivityList({ items }: ActivityListProps) {
  if (items.length === 0) {
    return <div className="state-panel">No activity found.</div>;
  }

  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
      {items.map((item, index) => (
        <ActivityItem key={item.id} item={item} isLast={index === items.length - 1} />
      ))}
    </ul>
  );
}
