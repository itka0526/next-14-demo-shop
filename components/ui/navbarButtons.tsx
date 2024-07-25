"use client";

import { useSession } from "@/lib/swr-client";
import Link from "next/link";
import { CartModal } from "./cart-modal";

export function NavbarButtons() {
    const { session, logout, isLoading } = useSession();
    if (!isLoading && session?.userId) {
        return (
            <>
                <CartModal />
                <li>
                    <button onClick={async () => await logout()}>Гарах</button>
                </li>
            </>
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
