import { NextRequest } from "next/server";
import { gateway } from "@/lib/gateway";
export const runtime = "nodejs";
export const maxDuration = 30;
export async function POST(request: NextRequest) {
  return gateway(request, "contact");
}
