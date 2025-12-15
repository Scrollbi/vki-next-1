import { NextResponse, type NextRequest } from 'next/server';
import { verifyAccessToken } from '@/utils/jwt';

export function middleware(request: NextRequest) {
  // Исключаем API роуты, статические файлы и страницу логина
  if (
    request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname === '/favicon.ico' ||
    request.nextUrl.pathname === '/login'
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('accessToken')?.value;
  const user = verifyAccessToken(token);

  // Если пользователь не авторизован, перенаправляем на логин
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
