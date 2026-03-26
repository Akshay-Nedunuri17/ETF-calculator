
import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // For demo purposes, we'll allow any login with any non-empty password
                if (credentials?.email && credentials?.password) {
                    return { 
                        id: Math.random().toString(), 
                        name: credentials.email.split('@')[0], 
                        email: credentials.email 
                    };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user, account, profile }: { token: JWT; user?: any; account?: any; profile?: any }) {
            // On first sign-in, persist user info to the token
            if (user) {
                token.email = user.email;
                token.name = user.name;
                token.picture = user.image ?? (profile as any)?.picture ?? null;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            // Expose token data to the client session
            if (session.user) {
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.image = (token.picture as string) ?? session.user.image ?? null;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET || "a-very-secret-key-for-development",
});

export { handler as GET, handler as POST };
