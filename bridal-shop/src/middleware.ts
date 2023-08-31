import { NextRequest, NextResponse } from "next/server"

export const config = {
  matcher: ['/user/:path*', '/cart/:path*','/register/:path*', '/login/:path*'],
}

export function middleware(request: NextRequest) {
    const hasToken = request.cookies.has('token');

    if (!hasToken && request.nextUrl.pathname.includes('/user')) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login`)
    }
    if(hasToken && (request.nextUrl.pathname.includes('/login')|| request.nextUrl.pathname.includes('/register'))) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/user`)
    }
    if(!hasToken && request.nextUrl.pathname.includes('/cart')) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login`)
    }
    return NextResponse.next();
}