
import NextAuth from "next-auth";
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
                // This is a mock implementation. In a real app, you'd check against a database.
                if (credentials?.email === "user@example.com" && credentials?.password === "password") {
                    return { id: "1", name: "J Smith", email: "user@example.com" };
                }
                // For demo purposes, we'll allow any login with 'demo' password
                if (credentials?.password === "demo") {
                    return { id: "2", name: "Demo User", email: credentials.email };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET || "a-very-secret-key-for-development",
});

export { handler as GET, handler as POST };
