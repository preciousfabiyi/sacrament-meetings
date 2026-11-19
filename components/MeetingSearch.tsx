"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) params.set("query", term);
    else params.delete("query");
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      type="search"
      placeholder="Search meetings..."
      defaultValue={searchParams.get("query")?.toString()}
      onChange={(event) => handleSearch(event.target.value)}
      className="w-full rounded-lg border p-3"
      aria-label="Search meetings"
    />
  );
}
