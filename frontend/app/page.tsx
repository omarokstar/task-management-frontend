import Link from "next/link";

function NavCard({
  href,
  title,
  description,
  iconPath,
}: {
  href: string;
  title: string;
  description: string;
  iconPath: string;
}) {
  return (
    <Link href={href} className="card nav-card" style={{ padding: "1.25rem 1.5rem", display: "block" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            backgroundColor: "var(--color-primary-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-primary)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={iconPath} />
          </svg>
        </div>
        <div className="nav-card-title" style={{ fontWeight: 600, fontSize: "16px", color: "var(--color-text)", transition: "color 0.15s ease" }}>
          {title}
        </div>
      </div>
      <div className="text-muted text-sm">{description}</div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main>
      <div className="page-header">
        <h1>Welcome</h1>
        <p>Select a module to get started.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
        <NavCard
          href="/tasks"
          title="Task Dashboard"
          description="View and manage all tasks by status."
          iconPath="M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z"
        />
        <NavCard
          href="/activity"
          title="Activity Feed"
          description="Browse and search recent activity logs."
          iconPath="M4 6h16 M4 12h16 M4 18h16"
        />
        <NavCard
          href="/reports"
          title="Reports"
          description="Summary statistics for tasks and activity."
          iconPath="M18 20V10 M12 20V4 M6 20v-6"
        />
      </div>
    </main>
  );
}
