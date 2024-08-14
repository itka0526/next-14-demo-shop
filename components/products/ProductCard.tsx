"use server";

import Image from "next/image";
import { Product } from "@prisma/client";
import Link from "next/link";
import prisma from "@/lib/db";

export async function ProductCard({ id, productName, productDisplayName, description, featured, price }: Product) {
    const res: { url: string }[] = await prisma.$queryRaw`
        SELECT url FROM "Image"
        WHERE "productId" = ${id}
        ORDER BY "id" ASC
        LIMIT 1;
    `;
    return (
        <div className="relative overflow-hidden rounded-lg group">
            <Link href={`/details/${productName}`} className="absolute inset-0 z-0" prefetch={false}>
                <span className="sr-only">View</span>
            </Link>
            <Image
                src={res.length ? res[0].url : "/placeholder.svg"}
                alt={productDisplayName}
                width={400}
                height={300}
                quality={50}
                className="object-cover w-full h-60 group-hover:opacity-50 transition-opacity"
            />
            <div className="p-4 bg-background">
                <h3 className="text-lg font-semibold">{productDisplayName}</h3>
                <p className="text-sm text-muted-foreground">{description.slice(0, 50) + (description.length > 50 ? "..." : "")}</p>
                {price > 0 && <h4 className="text-base font-semibold">{price.toLocaleString()}₮</h4>}
            </div>
        </div>
    );
}
