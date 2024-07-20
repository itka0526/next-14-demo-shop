"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function CollapsibleSidebar() {
    const inputRef = useRef<HTMLInputElement>(null);
    const pathname = usePathname();
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.checked = false;
        }
    }, [pathname]);
    return <input id="my-drawer-3" type="checkbox" className="drawer-toggle" ref={inputRef} />;
}
