"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PageHeading, Shell } from "@/components/Shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ExpiredDialog } from "@/components/ExpiredDialog";
import { loadSession, saveSession, useSession } from "@/lib/session";

const ROUTES = {
  not_registered: "/landing",
  registered: "/verifikasi",
  member: "/connected",
} as const;

export default function FormPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [expiredOpen, setExpiredOpen] = useState(false);

  const session = useSession();
  useEffect(() => {
    if (session === null) router.replace("/");
  }, [session, router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (otp.length < 6) {
      setError("Kode OTP harus 6 digit.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!data.ok) {
        if (data.reason === "expired_otp") {
          setExpiredOpen(true);
          return;
        }
        setError(data.reason === "invalid_otp" ? "Kode OTP salah." : "Format email tidak valid.");
        return;
      }
      saveSession({ ...(loadSession() ?? { code: "" }), email: data.email });
      router.push(ROUTES[data.status as keyof typeof ROUTES]);
    } catch {
      setError("Terjadi kesalahan, coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Shell>
      <PageHeading title="Verifikasi" highlight="akunmu">
        Masukkan email dan kode OTP yang tertera pada struk.
      </PageHeading>

      <Card>
        <CardContent>
          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label>Kode OTP</Label>
              <InputOTP maxLength={6} value={otp} onChange={setOtp} inputMode="numeric">
                <InputOTPGroup className="font-num">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot key={i} index={i} className="size-11 text-lg" />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Memeriksa..." : "Lanjut"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <ExpiredDialog
        open={expiredOpen}
        onOpenChange={setExpiredOpen}
        onRescan={() => router.push("/")}
      />
    </Shell>
  );
}
