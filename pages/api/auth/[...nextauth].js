import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
            } else {
                // Log error or handle the case when user is undefined
            }
            return token
        },
        async session(session, token) {
            if (token) {
                session.user.id = token.id
                session.user.email = token.email
            } else {
                // Log error or handle the case when token is undefined
            }
            return session
        },
        async signIn({ account, profile }) {  
            if (account.provider === "google") {  
                return profile.email_verified
            }
            return true // Do different verification for other providers that don't have `email_verified`
        },  
    },
})
