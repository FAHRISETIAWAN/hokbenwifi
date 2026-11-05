"use client";

import { CheckCircle2 } from "lucide-react";
import { IconBox } from "@/components/IconBox";
import { LottieIcon } from "@/components/LottieIcon";

const SRC = "https://lottie.host/e94dd3fb-8546-4848-aa6d-9a50d855bce5/6Js8o4i8ma.lottie";

export function SuccessLottie() {
  return <LottieIcon src={SRC} fallback={<IconBox icon={CheckCircle2} size="xl" />} />;
}
