"use server";

import prisma from "@/lib/db";
import { Stars } from "./stars";
import { getSession } from "@/lib/session-server";
import { User } from "@prisma/client";

export async function Ratings({ productId }: { readonly productId: number }) {
    const review = await prisma.review.aggregate({
        where: { productId },
        _avg: { stars: true },
        _count: { _all: true },
    });
    const session = await getSession();

    let user: User | null = null;
    if (session.userId) {
        user = await prisma.user.findUnique({ where: { id: session.userId } });
    }

    const averageScore = review._avg.stars ?? 0;
    const count = review._count._all ?? 0;

    return <Stars averageScore={averageScore} count={count} user={user} productId={productId} />;
}
