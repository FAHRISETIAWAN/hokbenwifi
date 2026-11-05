export type WifiUser = {
  email: string;
  terdaftar: boolean;
  member: boolean;
};

// Data dummy: email, terdaftar (true/false), member (true/false)
export const DUMMY_USERS: WifiUser[] = [
  { email: "budi@mail.com", terdaftar: false, member: false },
  { email: "siti@mail.com", terdaftar: true, member: false },
  { email: "andi@mail.com", terdaftar: true, member: true },
];

// OTP dummy yang dianggap valid (di produksi divalidasi ke sistem POS/WiFi controller)
export const DUMMY_VALID_OTP = "123456";

// OTP dummy yang dianggap sudah kadaluarsa
export const DUMMY_EXPIRED_OTPS = ["000000"];

export const WIFI_DURATION_MINUTES = 60;

export type CheckResult =
  | { ok: false; reason: "invalid_otp" | "invalid_email" | "expired_otp" }
  | { ok: true; status: "not_registered" | "registered" | "member"; email: string };

export function checkUser(emailRaw: string, otp: string): CheckResult {
  const email = emailRaw.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, reason: "invalid_email" };
  }
  if (DUMMY_EXPIRED_OTPS.includes(otp)) return { ok: false, reason: "expired_otp" };
  if (otp !== DUMMY_VALID_OTP) return { ok: false, reason: "invalid_otp" };

  const user = DUMMY_USERS.find((u) => u.email === email);
  // Email tidak ada di data = dianggap belum terdaftar
  if (!user || !user.terdaftar) return { ok: true, status: "not_registered", email };
  if (!user.member) return { ok: true, status: "registered", email };
  return { ok: true, status: "member", email };
}
