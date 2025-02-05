import {NextRequest, NextResponse} from "next/server";
import {validateToken} from "@/app/utils/auth";

export async function GET(req: NextRequest) {
  const accessToken = req?.cookies?.get("access_token")?.value;

  if (accessToken && await validateToken(accessToken)) {
    return NextResponse.json({authenticated: true, message: "Authenticated"});
  }

  return NextResponse.json({authenticated: false, message: "Unauthorized"}, {status: 401});
}