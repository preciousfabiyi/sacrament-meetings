
import { Suspense, type ReactNode } from "react";
import NavLinks from "@/components/NavLinks";

export default function MeetingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="space-y-6">
      <Suspense fallback={<nav className="h-10" />}>
        <NavLinks />
      </Suspense>

      {children}
    </section>
  );
}