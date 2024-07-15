import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./lib/auth";

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);

    if (path.startsWith("/dashboard") && session?.userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
