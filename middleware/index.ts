import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";


export async function middleware(request: NextRequest) {
    const session = await getSessionCookie(request);
    const { pathname } = request.nextUrl;
    // If user is not authenticated and trying to access protected routes, redirect to sign-in page
    if (!session && pathname !== "/sign-in" && pathname !== "/sign-up") {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    // If user is authenticated and trying to access auth routes, redirect to home page
    if (session && (pathname === "/sign-in" || pathname === "/sign-up")) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};