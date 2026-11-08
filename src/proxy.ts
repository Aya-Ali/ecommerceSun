import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// middleWare / Route.ts
export default async function proxy(req: NextRequest) {
    const jwt = await getToken({ req })
    if (jwt == null) {
      return  NextResponse.redirect('https://ecommerce-sun-delta.vercel.app/login')
    }
   return NextResponse.next()
}

export const config = {
    matcher: ['/profile/settings', '/cart']
}
