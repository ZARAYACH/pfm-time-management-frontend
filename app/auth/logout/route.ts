import {NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function GET() {
  const cookieStore = await cookies()
  cookieStore.delete("access_token")
  return NextResponse.json({authenticated: false});
}

