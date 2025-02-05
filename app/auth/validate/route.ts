import {NextRequest, NextResponse} from "next/server";
import {BASE_PATH} from "@/app/openapi";
import {createRemoteJWKSet, JWTPayload, jwtVerify} from "jose";

const JWKS_URL = BASE_PATH + "/.well-known/jwks.json";
const JWKS = createRemoteJWKSet(new URL(JWKS_URL));

export async function GET(req: NextRequest) {
  const accessToken = req?.cookies?.get("access_token")?.value;

  if (accessToken && await validateToken(accessToken)) {
    return NextResponse.json({ authenticated: true, message: "Authenticated" });
  }

  return NextResponse.json({ authenticated: false, message: "Unauthorized" }, { status: 401 });
}


export async function validateToken(token: string): Promise<JWTPayload | null> {
  console.log("ddddsssqq")
  try {
    const {payload} = await jwtVerify(token, JWKS, {
      algorithms: ["RS256"],
      requiredClaims: ['ROLES', 'SESSION_ID'],
    });
    return payload;
  } catch (error) {
    console.error("Token validation failed:", error);
    return null;
  }
}