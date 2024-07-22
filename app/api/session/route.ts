import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/types";
import { defaultSession } from "@/lib/session";

// read session
export async function GET() {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    return Response.json(session);
}

// logout
export async function DELETE() {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    session.destroy();
    return Response.json(defaultSession);
}
