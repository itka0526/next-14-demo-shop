import { NextAuthConfig } from "next-auth";
import prisma from "./lib/db";

export const authConfig = {
    pages: {
        signIn: "/login",
        newUser: "/register",
    },
    callbacks: {
        // MIDDLEWARE
        async authorized({ auth, request: { nextUrl } }) {
            // Must protect dashboard route from non-admin users
            const isAdminRoute = nextUrl.pathname.startsWith("/dashboard");
            if (isAdminRoute && !!auth?.user && auth.user.email) {
                // Gotta check if the user has admin role
                const user = await prisma.user.findUnique({
                    where: { email: auth.user.email },
                    select: { role: true },
                });
                if (!user) {
                    return false;
                } else {
                    return user.role === "ADMIN";
                }
            } else {
                return true;
            }
        },
    },
    providers: [],
} satisfies NextAuthConfig;
