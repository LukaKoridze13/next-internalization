import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { auth } from "./next_auth/auth";
import { NextResponse } from "next/server";

const protectedPages = ["/profile"];

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  const protectedPathnameRegex = RegExp(`^(/(${routing.locales.join("|")}))?(${protectedPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`, "i");

  const isLoggedIn = req.auth;

  const isProtectedPage = protectedPathnameRegex.test(req.nextUrl.pathname);

  if (isProtectedPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  } else {
    return intlMiddleware(req);
  }
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
