"use client";

import useSession from "@/lib/session";
import Link from "next/link";

export function NavbarButtons() {
    const { session, logout, isLoading } = useSession();
    if (!isLoading && session?.userId) {
        return (
            <li>
                <button onClick={() => logout()}>Гарах</button>
            </li>
        );
    } else {
        return (
            <>
                <li>
                    <Link href="/register">Бүртгүүлэх</Link>
                </li>
                <li>
                    <Link href="/login">Нэвтрэх</Link>
                </li>
            </>
        );
    }
}
