"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function Sidebar() {
    const router = useRouter();
    return (
        <aside className="h-full w-full p-6 flex flex-col gap-6 bg-background border-r">
            <Link
                href="/dashboard/products"
                className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted transition-colors"
                prefetch={false}
            >
                <span>Products</span>
            </Link>
            <Link href="/dashboard/users" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted transition-colors" prefetch={false}>
                <span>Users</span>
            </Link>
        </aside>
    );
}
