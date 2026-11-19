import Link from "next/link";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6">
      <Link href="/meetings" className="text-blue-700 underline">Back to meetings</Link>
      <h1 className="text-3xl font-bold">Meeting Administration</h1>
      {children}
    </main>
  );
}
