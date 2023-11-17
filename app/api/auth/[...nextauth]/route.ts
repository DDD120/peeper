import { getUser, register } from '@/apis/user'
import { UserType } from '@/types/type'
import { nanoid } from 'nanoid'
import NextAuth, { AuthOptions } from 'next-auth'
import GooleProvider from 'next-auth/providers/google'

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
    async signIn({ user, account }) {
      const userDoc = await getUser(user.id)
      if (!userDoc.exists()) {
        const nano = nanoid()
        await register({
          userId: user.id,
          username: user.name ?? nano,
          userImg: user.image,
          tag: nano,
          provider: account?.provider,
          email: user.email,
        })
      }

      return true
    },
    async session({ session, token }) {
      if (session?.user && token.sub) {
        const existingUser = await getUser(token.sub)
        if (!existingUser.exists()) return session
        const user = existingUser.data() as UserType
        session.user.name = user.username
        session.user.tag = user.tag
        session.user.image = user.userImg
        session.user.uid = user.userId
      }

      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
