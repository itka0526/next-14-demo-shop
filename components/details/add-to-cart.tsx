"use client";

import { ApiResponse } from "@/lib/types";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

type AddToCartProps = {
    productId: number;
};

export function AddToCart({ productId }: AddToCartProps) {
    const handleClick = async () => {
        const res = await fetch("/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId }),
        });
        const data: ApiResponse = await res.json();
        if (res.status) {
            // TODO: Launch a dom event, so we indicate that we added item into the cart.

            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    };
    return (
        <Button size="lg" className="w-full" onClick={handleClick}>
            Сагсанд нэмэх
        </Button>
    );
}
