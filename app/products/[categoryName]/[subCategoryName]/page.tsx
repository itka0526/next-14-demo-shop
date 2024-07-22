import { ProductCard } from "@/components/products/ProductCard";
import { ProductCardsWrapper } from "@/components/products/ProductCardsWrapper";
import prisma from "@/lib/db";
import { Product } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function Page({
    params: { categoryName, subCategoryName },
}: {
    readonly params: { readonly categoryName: string; readonly subCategoryName: string };
}) {
    const data: { products: Product[] } | null = await prisma.subCategory.findUnique({
        select: { products: true },
        where: { category: { categoryName }, subCategoryName: subCategoryName },
    });
    if (!data) return notFound();
    return (
        <ProductCardsWrapper>
            {data.products.map((product) => (
                <ProductCard key={`product-${product.id}`} {...product} />
            ))}
        </ProductCardsWrapper>
    );
}
