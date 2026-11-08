import { NextAuthOptions } from "next-auth";
import Credentials from 'next-auth/providers/credentials'
export const nextAuthConfig: NextAuthOptions = {

    providers: [
        Credentials({
            // name:"",
            credentials: {
                email: { placeholder: "enter Your Email" },
                password: {}
            },
            // btn login ,data save cookies
            async authorize(data) {


                const response = await fetch(`${process.env.BASE_URL}/api/v1/auth/signin`, {
                    method: "post",
                    body: JSON.stringify(data),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                const responseData = await response.json()
                console.log(responseData);
                // token save in cookies and redirect to local/
                if (responseData.message == 'success') {
                    return {
                        name: responseData.user.name,
                        email: responseData.user.email,
                        tokenFromBackEnd: responseData.token
                    }
                }

                return null
            }

        })
        ,

    ],
    pages: {
        signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        // login ,refresh , navgatvate
        // userData,token
        jwt(params) {
            if (params.user) {
                params.token.tokenJWT = params.user.tokenFromBackEnd
            }
            return params.token
            // name,email ,tokenJWT

        },
        // client  useSession, server getServerSession
        // userData,exp
        session(params) {
            // console.log("session Params",params);

            return params.session
        },

    },

    // session:{
    //     maxAge:60*60
    // }
}
