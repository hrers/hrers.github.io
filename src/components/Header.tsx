"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { href: "/", label: "cd /home" },
  { href: "/posts", label: "ls /posts" },
  { href: "/tags", label: "tags" },
  { href: "/about", label: "cat /about" },
  {
    href: "https://hrers.github.io/running_page",
    label: "running",
    external: true,
  },
] as const;

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
        <nav className="flex items-center gap-1 flex-wrap">
          {navItems.map((item) => {
            if ("external" in item && item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 text-sm transition-colors text-muted hover:text-foreground"
                >
                  <span className="text-muted">$ </span>
                  {item.label}
                </a>
              );
            }
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 py-1 text-sm transition-colors ${
                  isActive ? "text-primary" : "text-muted hover:text-foreground"
                }`}
              >
                <span className="text-muted">$ </span>
                {item.label}
                {isActive && (
                  <span className="cursor-blink text-primary">_</span>
                )}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={toggleTheme}
          className="px-2 py-1 text-sm text-muted hover:text-foreground transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "$ theme --light" : "$ theme --dark"}
        </button>
      </div>
    </header>
  );
}
