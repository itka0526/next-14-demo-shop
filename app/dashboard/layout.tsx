import { Sidebar } from "@/components/ui/sideBar";
import { SessionData, sessionOptions } from "@/lib/types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getSession() {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    return session;
}

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession();
    if (session.userId && session.userRole === "ADMIN") {
        return (
            <div className="grid grid-cols-[1fr,3fr] h-full w-full">
                <Sidebar />
                {children}
            </div>
        );
    } else {
        redirect("/");
    }
}
