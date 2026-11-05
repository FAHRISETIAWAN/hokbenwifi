"use client";

import { useRouter } from "next/navigation";
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

const SRC = "https://lottie.host/61e43382-c84f-4682-ae83-d8eb8467fb5a/QlkPglEELY.lottie";

const HOKBEN_URL = "https://www.hokben.co.id";

export function WifiEndedDialog({ open }: { open: boolean }) {
  const router = useRouter();
  return (
    <Dialog open={open}>
      <DialogContent className="gap-6 rounded-3xl p-6 sm:max-w-sm" showCloseButton={false}>
        <DialogHeader className="items-center gap-4 text-center">
          <LottieIcon src={SRC} className="size-28" fallback={<IconBox icon={TimerOff} size="xl" />} />
          <div className="space-y-1.5">
            <DialogTitle className="text-2xl">Waktu Anda Sudah Berakhir</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              Silakan lakukan pembelian lagi untuk menambah durasi WiFi.
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="m-0 flex-col gap-2 border-0 bg-transparent p-0 sm:flex-col">
          <Button
            size="lg"
            className="w-full"
            onClick={() => {
              window.location.href = HOKBEN_URL;
            }}
          >
            Pesan Kembali
          </Button>
          <Button variant="secondary" className="w-full" onClick={() => router.push("/")}>
            Kembali ke Beranda
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
