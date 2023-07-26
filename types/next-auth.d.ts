import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's email. */
      email: String;
      /** The user's id. */
      id: Number;
      /** The user's name. */
      name: String | null;
    }; // & DefaultSession["user"];
  }
}
