// NextAuth Configuration for TenderPulse
// ZAInnovate Technologies (Pty) Ltd

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "Contractor Terminal Access",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "director@construction.co.za" },
        companyName: { label: "Company Name", type: "text", placeholder: "Imvula Civil (Pty) Ltd" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        // Frontier quick-start or authenticated user
        return {
          id: "usr_zainnovate_001",
          name: credentials.companyName || "Executive Contractor",
          email: credentials.email,
          image: null,
          role: "USER",
          subscriptionTier: "PRO",
          csdNumber: "MAAA0492104",
          province: "Eastern Cape",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "USER";
        token.subscriptionTier = (user as any).subscriptionTier || "PRO";
        token.csdNumber = (user as any).csdNumber || "MAAA0492104";
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).subscriptionTier = token.subscriptionTier;
        (session.user as any).csdNumber = token.csdNumber;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "tenderpulse-super-secret-key-change-in-production-2025",
};
