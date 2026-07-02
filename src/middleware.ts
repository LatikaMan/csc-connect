import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/services(.*)',
  '/csc-finder(.*)',
  '/schemes(.*)',
  '/gallery',
  '/contact',
  '/status(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/services(.*)',
  '/api/csc-centers(.*)',
])

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isCSCAdminRoute = createRouteMatcher(['/csc-admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}