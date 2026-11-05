"use client";

import { useEffect, useRef, useState } from "react";

export default function QrScanner({ onScan }: { onScan: (text: string) => void }) {
  const [error, setError] = useState<string | null>(null);
  const doneRef = useRef(false);
  const onScanRef = useRef(onScan);
  useEffect(() => {
    onScanRef.current = onScan;
  }, [onScan]);

  useEffect(() => {
    let scanner: import("html5-qrcode").Html5Qrcode | null = null;
    let cancelled = false;

    (async () => {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        if (cancelled) return;
        scanner = new Html5Qrcode("qr-reader");
        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 240, height: 240 } },
          (text) => {
            if (doneRef.current) return;
            doneRef.current = true;
            onScanRef.current(text);
          },
          () => {},
        );
      } catch {
        setError("Kamera tidak bisa dibuka. Izinkan akses kamera atau gunakan tombol simulasi.");
      }
    })();

    return () => {
      cancelled = true;
      if (scanner?.isScanning) scanner.stop().then(() => scanner?.clear()).catch(() => {});
    };
  }, []);

  return (
    <div>
      <div id="qr-reader" className="overflow-hidden rounded-xl bg-muted" />
      {error && <p className="mt-3 text-sm text-muted-foreground">{error}</p>}
    </div>
  );
}
