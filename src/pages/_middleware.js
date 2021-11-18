import { NextResponse } from 'next/server'
import { getSession } from "next-auth/react"

export function middleware(req) {
  const session = getSession({ req })

  if (session) {

    return NextResponse.next()

  }

  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}