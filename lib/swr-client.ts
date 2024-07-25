"use client";

import { useEffect, useState } from "react";
import { ApiResponse, SessionData, UseCartItemReturnType } from "./types";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { BasketedItem, Product } from "@prisma/client";

export const defaultSession: SessionData = {
    userId: null,
    userRole: "USER",
};

export const defaultApiResponse: ApiResponse = {
    message: "Сервертэй холбогдож чадсангүй.",
    status: false,
};

async function fetchJson<JSON = unknown>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
    return fetch(input, {
        headers: {
            accept: "application/json",
            "content-type": "application/json",
        },
        ...init,
    }).then((res) => res.json());
}

function doLogout(url: string) {
    return fetchJson<SessionData>(url, {
        method: "DELETE",
    });
}

const sessionApiRoute = "/api/session";

export function useSession() {
    const { data: session, isLoading } = useSWR(sessionApiRoute, fetchJson<SessionData>, {
        fallbackData: defaultSession,
    });
    const { trigger: logout } = useSWRMutation(sessionApiRoute, doLogout);
    return { session, logout, isLoading };
}

const cartItemApiRoute = "/api/cart";

export function useCartItems() {
    const [basketedItems, setBasketedItems] = useState<BasketedItem[]>([]);
    const [isItemsLoading, setIsItemsLoading] = useState<boolean>(false);

    const fetchBasketedItems = async () => await fetchJson<ApiResponse>(cartItemApiRoute);
    useEffect(() => {
        (async function () {
            setIsItemsLoading(true);
            const res = await fetchBasketedItems();
            if (res.status && res.type === "basketedItems") {
                setBasketedItems(res.result);
            } else if (!res.status) {
                toast.error(res.message);
            } else {
                toast.error("Сервер дээр алдаа гарлаа.");
            }
            setIsItemsLoading(false);
        })();
    }, []);

    function useCartItem({ productId }: { productId: number }): UseCartItemReturnType {
        const [isDeleting, setIsDeleting] = useState(false);

        const { data: resCartItem, isLoading } = useSWR(cartItemApiRoute + `?id=${productId}`, fetchJson<ApiResponse>, {
            fallbackData: defaultApiResponse,
        });

        const deleteCartItem = async ({ productId }: { productId: number }) => {
            setIsDeleting(true);
            const resDeleteCartItem = await fetchJson<ApiResponse>(cartItemApiRoute, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId }),
            });
            if (resDeleteCartItem.status && resDeleteCartItem.type === "basketedItems") {
                setBasketedItems(resDeleteCartItem.result);
                toast.success(resDeleteCartItem.message);
            } else if (!resDeleteCartItem.status) {
                toast.error(resDeleteCartItem.message);
            } else {
                toast.error("Сервер дээр алдаа гарлаа.");
            }
            setIsDeleting(false);
        };

        return { cartItem: resCartItem.status ? (resCartItem.result as Product) : null, isLoading, isDeleting, deleteCartItem };
    }

    return {
        basketedItems,
        isItemsLoading,
        useCartItem,
    };
}
