
"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(
      new Intl.DateTimeFormat("en", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date())
    );
  }, []);

  return (
    <header className="bg-blue-900 px-6 py-5 text-white">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h1 className="text-xl font-bold">
          Grace Ward Sacrament Meetings
        </h1>

        <p className="text-sm text-blue-100">
          {currentDate}
        </p>
      </div>
    </header>
  );
}