"use server";

import prisma from "@/lib/db";

export async function CartItem({ productId }: { readonly productId: number }) {
    await prisma.product.findUnique({ where: { id: productId } });
    return <li></li>;
}
