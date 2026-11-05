"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Gift, Star, Cake, Truck } from "lucide-react";
import { Countdown } from "@/components/Countdown";
import { PageHeading, Shell } from "@/components/Shell";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSession } from "@/lib/session";
import { WIFI_DURATION_MINUTES } from "@/lib/dummy-data";
import { IconBox } from "@/components/IconBox";
import { cn } from "@/lib/utils";

const BENEFITS = [
  [Gift, "Voucher & diskon khusus member"],
  [Star, "Kumpulkan poin di setiap transaksi"],
  [Cake, "Hadiah spesial di hari ulang tahun"],
  [Truck, "Gratis ongkir untuk pesan antar"],
] as const;

export default function VerifikasiPage() {
  const router = useRouter();
  const session = useSession();
  const email = session?.email;
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (session === null || (session && !email)) router.replace("/");
  }, [session, email, router]);

  if (!email) return null;

  return (
    <Shell>
      <PageHeading title="Hampir" highlight="selesai!">
        Halo <span className="font-num text-foreground">{email}</span>, verifikasi untuk connect WiFi
        gratis selama <span className="font-num text-foreground">{WIFI_DURATION_MINUTES}</span> menit.
      </PageHeading>

      <Card>
        <CardContent>
          {connected ? (
            <div className="space-y-4">
              <p className="text-center font-semibold">Berhasil terhubung WiFi gratis</p>
              <Countdown minutes={WIFI_DURATION_MINUTES} />
            </div>
          ) : (
            <Button size="lg" className="w-full" onClick={() => setConnected(true)}>
              Verifikasi &amp; Connect (1 jam)
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Member promo */}
      <section className="mt-10">
        <h2 className="text-3xl leading-tight text-brand">Jadi Member HokBen, lebih untung!</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {BENEFITS.map(([Icon, text]) => (
            <div key={text} className="flex items-center gap-3 rounded-xl bg-card p-4">
              <IconBox icon={Icon} />
              <span className="text-sm">{text}</span>
            </div>
          ))}
        </div>
        <a
          href="https://www.hokben.co.id"
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ size: "lg" }), "mt-5 w-full")}
        >
          Daftar Member Sekarang
        </a>

        <Accordion className="mt-6">
          <AccordionItem value="a">
            <AccordionTrigger>Apa itu member HokBen?</AccordionTrigger>
            <AccordionContent>
              Program keanggotaan HokBen yang memberi poin, voucher, dan promo spesial di setiap
              transaksi.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Bagaimana cara daftar?</AccordionTrigger>
            <AccordionContent>
              Buka aplikasi HokBen, masuk dengan email yang sama, lalu aktifkan keanggotaan.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </Shell>
  );
}
