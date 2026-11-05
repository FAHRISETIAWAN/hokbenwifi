"use client";

import { useMemo, useSyncExternalStore } from "react";

const KEY = "hokben-wifi-session";

export type Session = { code: string; email?: string; remainingSeconds?: number };

export function saveSession(s: Session) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(s));
  } catch {}
}

function readRaw(): string | null {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function loadSession(): Session | null {
  const raw = readRaw();
  return raw ? (JSON.parse(raw) as Session) : null;
}

const subscribe = () => () => {};

/** undefined = belum hydrate (server), null = tidak ada session, selain itu = session. */
export function useSession(): Session | null | undefined {
  const raw = useSyncExternalStore<string | null | undefined>(subscribe, readRaw, () => undefined);
  return useMemo(() => (raw ? (JSON.parse(raw) as Session) : (raw as null | undefined)), [raw]);
}
