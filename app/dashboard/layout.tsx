import { Sidebar } from "@/components/ui/sideBar";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session-server";

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
