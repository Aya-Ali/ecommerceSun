import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
    const cookiesData = await cookies()
    const sessionToken = cookiesData.get("next-auth.session-token")
    const token = await decode({ token: sessionToken?.value, secret: process.env.NEXTAUTH_SECRET! })
    return token?.tokenJWT

}