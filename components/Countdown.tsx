"use client";

import { useEffect, useState } from "react";

export function Countdown({ minutes }: { minutes: number }) {
  const [left, setLeft] = useState(minutes * 60);

  useEffect(() => {
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div className="text-center">
      <p className="font-num text-5xl font-bold text-brand">
        {mm}:{ss}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">Sisa waktu WiFi gratis</p>
    </div>
  );
}
