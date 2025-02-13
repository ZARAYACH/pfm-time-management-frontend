import {NextRequest, NextResponse} from "next/server";
import {validateToken} from "@/app/utils/auth";

const roleRoutes: { role: string, reg: RegExp }[] = [
  {role: "ROLE_ADMIN", reg: /^\/admin(\/|$)/},
  {role: "ROLE_TEACHER", reg: /^\/teacher(\/|$)/},
  {role: "ROLE_STUDENT", reg: /^\/student(\/|$)/},
];

const publicAuthRoute: RegExp = /^\/auth(\/|$)/;

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const decodedToken = token ? await validateToken(token) : null;

  const currentPath = req.nextUrl.pathname;

  if (
    currentPath.startsWith("/_next/") ||
    currentPath.startsWith("/static/") ||
    currentPath.startsWith("/favicon.ico") ||
    currentPath.startsWith("/robots.txt") ||
    currentPath.startsWith("/images/") ||
    currentPath.startsWith("/public/") ||
    publicAuthRoute.test(currentPath)
  ) {
    return NextResponse.next(); // Continue without any restrictions for these paths
  }

  if (!decodedToken) {
    if (roleRoutes.some((route) => route.reg.test(currentPath))) {
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl.origin));
    }
    return NextResponse.next(); // Continue with non-protected routes
  }


  const userRole = (decodedToken.ROLES as string[])?.[0];

  const roleRoute = roleRoutes.find((route) => route.role === userRole);

  if (roleRoute && roleRoute.reg.test(currentPath)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(getDashboardUrl(userRole), req.nextUrl.origin));

}

const getDashboardUrl = (role: string): string => {
  if (role === "ROLE_ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "ROLE_TEACHER") {
    return "/teacher/dashboard";
  }
  return "/student/dashboard"; // Default to student dashboard
}
