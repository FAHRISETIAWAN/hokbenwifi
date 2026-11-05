import { NextResponse } from "next/server";
import { checkUser } from "@/lib/dummy-data";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const result = checkUser(String(body.email ?? ""), String(body.otp ?? ""));
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
