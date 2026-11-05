"use client";

import { TimerOff } from "lucide-react";
import { IconBox } from "@/components/IconBox";
import { LottieIcon } from "@/components/LottieIcon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SRC = "https://lottie.host/3cf12d09-d445-4c14-a629-e9ba9580ba9b/lbV8Z0kiXq.lottie";

export function ExpiredDialog({
  open,
  onOpenChange,
  onRescan,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRescan: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-6 rounded-3xl p-6 sm:max-w-sm" showCloseButton={false}>
        <DialogHeader className="items-center gap-4 text-center">
          <LottieIcon src={SRC} className="size-28" fallback={<IconBox icon={TimerOff} size="xl" />} />
          <div className="space-y-1.5">
            <DialogTitle className="text-2xl">OTP Kadaluarsa</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              Kode OTP pada struk sudah tidak berlaku. Scan ulang QR atau minta struk baru ke kasir.
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="m-0 flex-col gap-2 border-0 bg-transparent p-0 sm:flex-col">
          <Button size="lg" className="w-full" onClick={onRescan}>
            Scan Ulang
          </Button>
          <Button variant="secondary" className="w-full" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
