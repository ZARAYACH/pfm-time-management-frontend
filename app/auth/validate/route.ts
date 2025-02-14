import {NextRequest, NextResponse} from "next/server";
import {validateToken} from "@/app/utils/auth";
import {cookies} from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()

  let accessToken ;
  if (cookieStore.has("access_token")) {
    accessToken = req?.cookies?.get("access_token")?.value
  }else {
    accessToken = req?.headers.get("Authorization")?.split(" ")[1];
  }

  if (accessToken && await validateToken(accessToken)) {
    cookieStore.set("access_token", accessToken)
    return NextResponse.json({authenticated: true, message: "Authenticated"});
  }

  return NextResponse.json({authenticated: false, message: "Unauthorized"}, {status: 401});
}