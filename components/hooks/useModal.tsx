"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function useModal() {
    const [open, setOpen] = useState<boolean>(false);
    const toggle = () => setOpen((prev) => !prev);
    const ref = useRef<HTMLElement | null>(null);
    useEffect(() => {
        ref.current = document.getElementById("body");
    }, []);
    const DefaultCloseButton = () => (
        <div className="modal-action">
            <button className="btn text-destructive" onClick={toggle}>
                Хаах
            </button>
        </div>
    );
    const Modal = ({ children }: React.PropsWithChildren) => (
        <>
            {ref.current ? (
                createPortal(
                    <dialog id="cart-modal" className={cn("modal", open ? "modal-open" : "")}>
                        <div className="modal-box flex flex-col gap-4">{children}</div>
                    </dialog>,
                    ref.current
                )
            ) : (
                <></>
            )}
        </>
    );
    return {
        open,
        toggle,
        Modal,
        DefaultCloseButton,
    };
}
