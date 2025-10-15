import authService from "@/services/auth.service"
import { CustomAuthError } from "@/utils/autherror"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/signin',
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) {
          throw new CustomAuthError("Email and password are required")
        }

        const authResponse = await authService.login({
          email: String(credentials.email),
          password: String(credentials.password),
        })

        if (!authResponse) {
          throw new CustomAuthError("Invalid email or password")
        }

        return {
          id: authResponse.user?.id,
          name: authResponse.user?.name,
          email: authResponse.user?.email,
          role: authResponse.user?.role, // Ensure role is included
          accessToken: authResponse.tokens.accessToken.token,
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          role: token.role as string,
          accessToken: token.accessToken as string,
        }
      }
    },
    jwt({ token, user, trigger, session, account }) {
      if (account && user) {
        token.id = user.id
        token.email = user.email
        token.role = user.role
        token.accessToken = user.accessToken
      }
      return token
    }
  },
})