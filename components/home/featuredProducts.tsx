"use server";

import { ProductCard } from "@/components/products/ProductCard";
import prisma from "@/lib/db";
import { ProductCardsWrapper } from "../products/ProductCardsWrapper";
import { Suspense } from "react";
import { ProductCardSkeleton } from "../skeletons/product-card";

export async function FeaturedProducts() {
    const featuredProducts = await prisma.product.findMany({ where: { featured: true } });
    return (
        <ProductCardsWrapper>
            {featuredProducts.map((product) => (
                <Suspense key={`suspense-product-${product.id}`} fallback={<ProductCardSkeleton />}>
                    <ProductCard key={`product-${product.id}`} {...product} />
                </Suspense>
            ))}
        </ProductCardsWrapper>
    );
}
