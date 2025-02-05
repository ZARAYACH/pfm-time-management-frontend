import {createRemoteJWKSet, JWTPayload, jwtVerify} from "jose";
import {BASE_PATH} from "@/app/openapi";

export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const decodeToken = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};

const JWKS_URL = BASE_PATH + "/.well-known/jwks.json";
const JWKS = createRemoteJWKSet(new URL(JWKS_URL));

export async function validateToken(token: string): Promise<JWTPayload | null> {
  try {
    const {payload} = await jwtVerify(token, JWKS, {
      algorithms: ["RS256"],
      requiredClaims: ["ROLES", "SESSION_ID"],
    });
    return payload;
  } catch (error) {
    console.error("Token validation failed:", error);
    return null;
  }
}
