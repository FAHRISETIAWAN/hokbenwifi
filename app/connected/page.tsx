"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BadgeCheck, Clock } from "lucide-react";
import { Countdown } from "@/components/Countdown";
import { IconBox } from "@/components/IconBox";
import { SuccessLottie } from "@/components/SuccessLottie";
import { WifiEndedDialog } from "@/components/WifiEndedDialog";
import { PageHeading, Shell } from "@/components/Shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSession } from "@/lib/session";
import { WIFI_DURATION_SECONDS, formatDuration } from "@/lib/dummy-data";

export default function ConnectedPage() {
  const router = useRouter();
  const session = useSession();
  const email = session?.email;
  const seconds = session?.remainingSeconds ?? WIFI_DURATION_SECONDS;
  const [open, setOpen] = useState(true);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (session === null || (session && !email)) router.replace("/");
  }, [session, email, router]);

  if (!email) return null;

  return (
    <Shell>
      <PageHeading title="Terhubung" highlight="WiFi gratis">
        Masuk sebagai <span className="font-num text-foreground">{email}</span>
      </PageHeading>

      <Card>
        <CardContent>
          <Countdown
            seconds={seconds}
            onEnd={() => {
              setOpen(false);
              setEnded(true);
            }}
          />
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-6 rounded-3xl p-6 sm:max-w-sm" showCloseButton={false}>
          <DialogHeader className="items-center gap-4 text-center">
            <SuccessLottie />
            <div className="space-y-1.5">
              <DialogTitle className="text-2xl">Selamat!</DialogTitle>
              <DialogDescription className="text-sm leading-relaxed">
                Anda berhasil connect WiFi gratis. Nikmati internetmu selama{" "}
                <span className="font-num font-semibold text-foreground">{formatDuration(seconds)}</span>.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5 rounded-xl bg-muted/60 p-3">
              <IconBox icon={Clock} size="sm" />
              <div>
                <p className="text-xs text-muted-foreground">Durasi</p>
                <p className="font-num text-sm font-semibold">{formatDuration(seconds)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl bg-muted/60 p-3">
              <IconBox icon={BadgeCheck} tone="blue" size="sm" />
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="text-sm font-semibold">Member</p>
              </div>
            </div>
          </div>

          <DialogFooter className="m-0 flex-col border-0 bg-transparent p-0 sm:flex-col">
            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                setOpen(false);
                window.location.href = "https://www.google.com";
              }}
            >
              Mulai Browsing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <WifiEndedDialog open={ended} />
    </Shell>
  );
}
