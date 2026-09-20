import type { ActivityLog } from "@/types/api";

type ActivityItemProps = {
  item: ActivityLog;
};

export function ActivityItem({ item }: ActivityItemProps) {
  return (
    <li style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.6rem" }}>
      <div style={{ fontWeight: 600 }}>{item.action || "(no action)"}</div>
      <div>{item.info || "(no info)"}</div>
      <small style={{ color: "var(--muted)" }}>
        {new Date(item.when).toLocaleString()}
      </small>
    </li>
  );
}
