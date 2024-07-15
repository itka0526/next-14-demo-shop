import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { SessionPayload } from "./types";
import prisma from "./db";
import { User } from "@prisma/client";

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("1hr").sign(key);
}

export async function decrypt(session: string | undefined = ""): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ["HS256"],
        });
        return payload as SessionPayload;
    } catch (error) {
        console.log("Failed to verify session");
        return null;
    }
}

export async function createSession(user: User) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await prisma.session.create({
        data: {
            expiresAt,
            userId: user.id,
            userRole: user.role,
        },
    });

    const session = await encrypt({
        userId: user.id,
        userRole: user.role,
        expiresAt: expiresAt,
    });

    cookies().set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });
}
