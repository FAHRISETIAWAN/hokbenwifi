"use client";

import { useEffect, useRef, useState } from "react";

export function Countdown({ seconds, onEnd }: { seconds: number; onEnd?: () => void }) {
  const [left, setLeft] = useState(seconds);
  const onEndRef = useRef(onEnd);
  const firedRef = useRef(false);

  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  useEffect(() => {
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (left === 0 && !firedRef.current) {
      firedRef.current = true;
      onEndRef.current?.();
    }
  }, [left]);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div className="text-center">
      <p className="font-num text-5xl font-bold text-brand">
        {mm}:{ss}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        {left === 0 ? "Waktu WiFi telah berakhir" : "Sisa waktu WiFi gratis"}
      </p>
    </div>
  );
}
