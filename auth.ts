import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/db";
import { z } from "zod";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const checkedCreds = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);
                if (checkedCreds.success) {
                    const { email, password } = checkedCreds.data;
                    // Retrieve user back from the database.
                    const user = await prisma.user.findUnique({ where: { email } });
                    if (!user) {
                        // User was not found
                        return null;
                    } else if (user.password === password) {
                        // Check if the passwords match
                        return user;
                    } else {
                        // Passwords didn't match
                        return null;
                    }
                } else {
                    return null;
                }
            },
        }),
    ],
});
