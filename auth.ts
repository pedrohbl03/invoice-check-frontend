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
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
  },
})