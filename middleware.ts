import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Define Route Categories
  const isPublicRoute = 
    pathname === '/' || 
    pathname.startsWith('/privacy') || 
    pathname.startsWith('/terms');
    
  const isAuthRoute = pathname.startsWith('/login');
  
  // 2. Retrieve Session 
  const sessionToken = request.cookies.get('peranti_session')?.value;
  const userRole = request.cookies.get('peranti_role')?.value || 'viewer'; 

  // 3. Enforce Authentication
  if (!sessionToken && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Prevent authenticated users from accessing login page
  if (sessionToken && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 4. Inject Headers for Backend
  const requestHeaders = new Headers(request.headers);
  if (sessionToken) {
    requestHeaders.set('x-peranti-role', userRole);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
