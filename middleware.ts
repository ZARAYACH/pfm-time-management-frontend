import {NextResponse} from "next/server";
//
// const protectedRoutes = ['/admin/dashboard']
//
// const authRoutes = [
//   '/auth/login',
//   '/auth/register',
// ]
//TODO : implement a way to validate access token with the jwk sets from "/.well-known/jwks.json"
export default function middleware() {
  // const authenticated = req?.cookies?.has("access_token")

  // if (authenticated && authRoutes.includes(req.nextUrl.pathname)) {
  //   const absoluteURL = new URL("/admin/dashboard", req.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }
  //
  // if (!authenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
  //   const absoluteURL = new URL("/auth/login", req.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }
  return NextResponse.next();
}