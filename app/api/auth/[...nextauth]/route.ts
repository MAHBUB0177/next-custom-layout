import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true as any,
    strategy: "jwt",
    updateAge: 0,
  },
  callbacks: {
    jwt: async ({ token, user }: { token: any; user: any }) => {
      if (typeof user !== "undefined") {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      if (session !== null) {
        session.user = token.user;
      } else if (typeof token !== "undefined") {
        session.token = token;
      }
      return session;
    },
  },
  site: process.env.NEXTAUTH_URL,
  cookie: {
    secure: process.env.NODE_ENV === "production",
  },
  redirect: false,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "mailto:test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(userData: any) {
        try {
          if (userData?.email && userData?.name) {
            return userData; // Return valid user data to NextAuth
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
} as NextAuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
