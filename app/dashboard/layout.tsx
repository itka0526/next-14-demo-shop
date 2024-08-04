import { Sidebar } from "@/components/ui/sideBar";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="grid grid-cols-[1fr,3fr] h-full w-full">
            <Sidebar />
            {children}
        </div>
    );
}
