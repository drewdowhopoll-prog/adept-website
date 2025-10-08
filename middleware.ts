import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Redirect only root "/" to default locale.
// Do NOT try to detect locale here (keeps it build-safe).
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/fr";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/(fr|en)(/.*)?"],
};
