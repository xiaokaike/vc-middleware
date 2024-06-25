import { ipAddress, next } from '@vercel/edge';
import p from 'ua-parser-js';
// Set pathname were middleware will be executed
export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
};

export default async function middleware(request: Request) {
  const url = new URL(request.url);

  let isMobile = false;

  try {
    const aa = new p(request.headers.get('user-agent') as string);
    isMobile = aa.getDevice().type === 'mobile';
  } catch (e) {}

  console.log('isMobile', isMobile, url.pathname);

  if (isMobile) {
    return url.pathname === '/mobile.html'
      ? next()
      : Response.redirect(new URL('/mobile.html', request.url));
  }

  return url.pathname === '/pc.html'
    ? next()
    : Response.redirect(new URL('/pc.html', request.url));
}
