import { comparePasswords, hashPassword } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (session.user) {
        const [fetchedUser] = await db
          .select()
          .from(users)
          .where(eq(users.email, session.user?.email as string));
        return { ...session, user: fetchedUser };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      // @ts-expect-error
      async authorize(credentials) {
        if (
          (credentials?.email.length as number) > 2 &&
          (credentials?.password.length as number) > 2
        ) {
          const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials?.email!));

          if (user) {
            const isUser = await comparePasswords(
              credentials?.password!,
              user.password
            );
            if (isUser) {
              return user;
            } else {
              return null;
            }
          } else {
            const [user] = await db
              .insert(users)
              .values({
                email: credentials?.email!,
                password: await hashPassword(credentials?.password!),
              })
              .returning();
            return user;
          }
        } else {
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
