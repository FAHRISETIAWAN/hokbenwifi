"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const noop = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      aria-label={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-xl"
    >
      {mounted ? isDark ? <Sun /> : <Moon /> : null}
    </Button>
  );
}
