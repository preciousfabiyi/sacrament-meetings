
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "All Meetings", href: "/meetings" },
  { name: "Current Meeting", href: "/meetings/current" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="flex flex-wrap gap-3 border-b border-gray-200 pb-4"
    >
      {links.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href === "/meetings" &&
            pathname.startsWith("/meetings/") &&
            pathname !== "/meetings/current");

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-blue-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
