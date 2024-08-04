import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./lib/session-server";

export async function middleware(request: NextRequest) {
    const { userId, userRole } = await getSession();
    if (!userId && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: "/dashboard/:path*",
};
