import NextAuth, { AuthOptions } from "next-auth"
import GooleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.AUTH_SECRET,
  },
  providers: [
    GooleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.tag = session.user?.name
          ?.split(" ")
          .join("")
          .toLocaleLowerCase()
        session.user.uid = token.sub
      }

      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
