import { auth } from "../auth"

const publicRoutes = ["/signin", "/signup", "/api/auth/signin", "/api/auth/signout"]

export const middleware = auth((req) => {
  const isLoggedIn = !!req.auth?.user;

  if (!isLoggedIn && !publicRoutes.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/signin", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }

  if (isLoggedIn && publicRoutes.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg$).*)",
  ],
};