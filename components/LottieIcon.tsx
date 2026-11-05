"use client";

import { useState, type ReactNode } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/** Animasi Lottie; bila gagal dimuat (mis. belum ada internet) tampil fallback. */
export function LottieIcon({
  src,
  fallback,
  className = "-my-8 size-56",
}: {
  src: string;
  fallback: ReactNode;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;

  return (
    <div className={className}>
      <DotLottieReact
        src={src}
        autoplay
        loop={false}
        dotLottieRefCallback={(dotLottie) => {
          dotLottie?.addEventListener("loadError", () => setFailed(true));
        }}
      />
    </div>
  );
}
