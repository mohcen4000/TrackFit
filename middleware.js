import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const route = req.nextUrl.pathname;


  const protectedRoutes = ['/Home', '/Workout','/Meal','/Events','/Coaches']; 
  if (protectedRoutes.some(protectedRoute => route.startsWith(protectedRoute)) && !token) {
    return NextResponse.redirect(new URL('/Login', req.url));
  }


  if (route.startsWith('/admin') && (!token || token.role !== 2)) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
  if (route.startsWith('/coach') && (!token || token.role !== 3)) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
  if (route.startsWith('/nutritionist') && (!token || token.role !== 4)) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}
