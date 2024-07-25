import { ShoppingBasketIcon } from "lucide-react";
import { useState } from "react";
import { CartItemSkeleton } from "../skeletons/cart-item-skeleton";
import { useCartItems } from "@/lib/swr-client";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";
import { Button } from "./button";
import { UseCartItemReturnType } from "@/lib/types";

export function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => setIsOpen((s) => !s);
    return (
        <>
            <li onClick={handleClick}>
                <div className="hidden md:block">
                    <ShoppingBasketIcon className="w-5 h-5 " />
                </div>
                <span className="block md:hidden">Сагс</span>
            </li>
            <dialog id="cart-modal" className={cn("modal", isOpen && "modal-open")}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Таны сагс</h3>
                    {isOpen && <CartItems handleClick={handleClick} />}
                    <div className="modal-action">
                        <button className="btn" onClick={handleClick}>
                            Хаах
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}

function CartItems({ handleClick }: { handleClick: () => void }) {
    const { basketedItems, isItemsLoading, useCartItem } = useCartItems();
    if (isItemsLoading) {
        return (
            <ul className="my-4">
                <CartItemSkeleton />
                <CartItemSkeleton />
                <CartItemSkeleton />
            </ul>
        );
    }
    return (
        <ul className="my-4">
            {basketedItems.map((item) => (
                <CartItem key={`cart-item-${item.id}`} productId={item.productId} handleClick={handleClick} useCartItem={useCartItem} />
            ))}
        </ul>
    );
}

function CartItem({
    productId,
    handleClick,
    useCartItem,
}: {
    readonly productId: number;
    handleClick: () => void;
    useCartItem: ({ productId }: { productId: number }) => UseCartItemReturnType;
}) {
    const { cartItem, isLoading, isDeleting, deleteCartItem } = useCartItem({ productId });
    if (isLoading) {
        return <CartItemSkeleton />;
    }
    if (!cartItem) return null;
    return (
        <li className="flex">
            <div className="flex justify-between items-center w-full gap-4">
                <div className="flex gap-4 items-center justify-between w-full">
                    <Link href={`/details/${cartItem.productName}`} onClick={handleClick}>
                        {cartItem.productDisplayName}
                    </Link>
                    <span>{cartItem.price.toLocaleString()}₮</span>
                </div>
                <Button
                    className="hover:bg-destructive hover:text-primary text-xs"
                    onClick={async () => {
                        await deleteCartItem({ productId });
                    }}
                    disabled={isDeleting}
                >
                    Устгах
                </Button>
            </div>
        </li>
    );
}
