"use server";

import { SessionData, sessionOptions } from "@/lib/types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getSession() {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    return session;
}

export default async function Dashboard() {
    const session = await getSession();

    if (session.userId && session.userRole === "ADMIN") {
        return <h1>Welcome to Dashboard! {session.userId}</h1>;
    } else {
        redirect("/");
    }
}
