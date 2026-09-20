"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <header className="app-header">
      <div className="app-logo">
        <div className="app-logo-mark" aria-hidden="true"></div>
        <span>VeeLion Task Manager</span>
      </div>
      <nav className="app-nav">
        <Link href="/" className={`app-nav-link ${pathname === "/" ? "active" : ""}`}>
          Home
        </Link>
        <Link href="/tasks" className={`app-nav-link ${pathname === "/tasks" ? "active" : ""}`}>
          Dashboard
        </Link>
        <Link href="/activity" className={`app-nav-link ${pathname === "/activity" ? "active" : ""}`}>
          Activity
        </Link>
        <Link href="/reports" className={`app-nav-link ${pathname === "/reports" ? "active" : ""}`}>
          Reports
        </Link>
      </nav>
    </header>
  );
}
