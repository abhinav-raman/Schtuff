import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

const googleProvider = GoogleProvider({
	clientId: process.env.GOOGLE_ID as string,
	clientSecret: process.env.GOOGLE_SECRET as string,
});

export default NextAuth({
	providers: [googleProvider],
	secret: process.env.NEXTAUTH_SECRET,
});

export const authOptions: NextAuthOptions = {
	providers: [googleProvider],
};
