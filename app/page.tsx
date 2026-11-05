"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Camera, KeyRound, QrCode, ScanLine, Wifi } from "lucide-react";
import { IconBox } from "@/components/IconBox";
import { PageHeading, Shell } from "@/components/Shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { saveSession } from "@/lib/session";

const QrScanner = dynamic(() => import("@/components/QrScanner"), { ssr: false });

const STEPS = [
  [ScanLine, "Scan QR", "Arahkan kamera ke QR di struk"],
  [KeyRound, "Input OTP", "Masukkan email & kode OTP"],
  [Wifi, "Connect", "WiFi aktif selama 1 jam"],
] as const;

export default function ScanPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);

  function handleScan(text: string) {
    saveSession({ code: text });
    router.push("/form");
  }

  return (
    <Shell>
      <PageHeading title="WiFi gratis" highlight="1 jam">
        Scan QR code pada struk HokBen untuk mulai terhubung.
      </PageHeading>

      <Card>
        <CardContent className="space-y-3">
          {started ? (
            <QrScanner onScan={handleScan} />
          ) : (
            <div className="flex flex-col items-center gap-4 py-6">
              <IconBox icon={QrCode} size="xl" />
              <Button size="lg" onClick={() => setStarted(true)}>
                <Camera /> Buka Kamera &amp; Scan
              </Button>
            </div>
          )}
          <Button variant="secondary" className="w-full" onClick={() => handleScan("DEMO-QR-HOKBEN")}>
            Simulasi scan QR (demo)
          </Button>
        </CardContent>
      </Card>

      <div className="mt-8 grid grid-cols-1 gap-3 lg:grid-cols-3">
        {STEPS.map(([Icon, title, desc], i) => (
          <div
            key={title}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-surface-elevated lg:flex-col lg:items-start"
          >
            <IconBox icon={Icon} tone={i === 1 ? "blue" : "yellow"} />
            <div>
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
