import { Download, Gift, Smartphone, Wifi } from "lucide-react";
import { PageHeading, Shell } from "@/components/Shell";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IconBox } from "@/components/IconBox";
import { cn } from "@/lib/utils";

const PERKS = [
  [Wifi, "WiFi gratis setiap pembelian"],
  [Gift, "Promo & voucher eksklusif"],
  [Smartphone, "Pesan antar lebih cepat"],
] as const;

export default function LandingPage() {
  return (
    <Shell>
      <PageHeading title="Download aplikasi" highlight="HokBen">
        Email kamu belum terdaftar. Download aplikasi, daftar akun, lalu scan ulang QR di struk
        untuk menikmati WiFi gratis.
      </PageHeading>

      <Card>
        <CardContent className="space-y-6">
          <ul className="space-y-3">
            {PERKS.map(([Icon, text]) => (
              <li key={text} className="flex items-center gap-3 text-sm">
                <IconBox icon={Icon} /> {text}
              </li>
            ))}
          </ul>
          <div className="space-y-3">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "w-full")}
            >
              <Download /> Download di Google Play
            </a>
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full")}
            >
              <Download /> Download di App Store
            </a>
          </div>
        </CardContent>
      </Card>
    </Shell>
  );
}
