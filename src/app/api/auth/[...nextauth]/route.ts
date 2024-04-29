import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "Password",
          placeholder: "********",
        },
      },
      async authorize(credentials, req) {
        const findUser = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!findUser) throw new Error("User Not Found");

        const hashMatch = await bcrypt.compare(
          `${credentials?.password}`,
          findUser.password
        );

        if (!hashMatch) throw new Error("Wrong password");

        return {
          id: `${findUser.id}`,
          email: findUser.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
