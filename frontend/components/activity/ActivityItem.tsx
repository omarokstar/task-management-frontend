import type { ActivityLog } from "@/types/api";

type ActivityItemProps = {
  item: ActivityLog;
  isLast?: boolean;
};

export function ActivityItem({ item, isLast }: ActivityItemProps) {
  const initial = item.action ? item.action.charAt(0).toUpperCase() : "A";

  return (
    <li style={{ display: "flex", alignItems: "flex-start", gap: "1rem", paddingBottom: isLast ? 0 : "1.5rem", position: "relative" }}>
      {!isLast && (
        <div
          style={{
            position: "absolute",
            left: "15px",
            top: "32px",
            bottom: "-8px",
            width: "2px",
            backgroundColor: "var(--color-border)",
            zIndex: 0,
          }}
        />
      )}

      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "var(--color-primary-muted)",
          color: "var(--color-primary-strong)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          fontSize: "14px",
          flexShrink: 0,
          zIndex: 1,
        }}
      >
        {initial}
      </div>

      <div style={{ flex: 1, minWidth: 0, paddingTop: "4px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.5rem", alignItems: "flex-start", marginBottom: "0.25rem" }}>
          <div style={{ fontWeight: 500, fontSize: "14px", color: "var(--color-text)" }}>
            {item.action || "(no action)"}
          </div>
          <div style={{ fontSize: "12px", color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>
            {new Date(item.when).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
          </div>
        </div>
        {item.info && (
          <div style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>{item.info}</div>
        )}
      </div>
    </li>
  );
}
