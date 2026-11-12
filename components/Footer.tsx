

"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  return (
    <footer className="mt-auto bg-gray-100 px-6 py-6 text-center text-gray-700">
      <p className="text-sm">
        © {year} Grace Ward Sacrament Meetings
      </p>

      <p className="mt-1 text-xs">
        Helping members stay informed and organized.
      </p>
    </footer>
  );
}