import type { ReactNode } from "react";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      {/* top-nav-dark */}
      <nav className="border-b border-border">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <Image src="/hokben.png" alt="HokBen" width={40} height={40} className="size-10 rounded-xl object-cover" priority />
            <span className="text-lg font-extrabold tracking-tight text-foreground">
              HokBen <span className="text-brand">WiFi</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Bantuan</span>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-xl flex-1 px-4 py-10">{children}</main>

    </div>
  );
}

export function PageHeading({
  title,
  highlight,
  children,
}: {
  title: string;
  highlight?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl leading-[1.1] font-bold sm:text-5xl">
        {title} {highlight && <span className="text-brand">{highlight}</span>}
      </h1>
      {children && <p className="mt-3 text-base text-muted-foreground">{children}</p>}
    </div>
  );
}
