import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const isAuthenticated = req.cookies.get('accessToken'); // Check if the user is authenticated (e.g., by checking for a token in the cookies)

  if (!isAuthenticated && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(`${origin}/login`);
  }

  if (isAuthenticated && pathname === '/login') {
    return NextResponse.redirect(`${origin}/`);
  }

  return NextResponse.next();
}

const protectedRoutes = ['/'];

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api route
     * 2. /_next/static (Static Image Import)
     * 3. /_next/image (Image Optimization Files)
     * 4. /favicon.ico (Favicon File)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};