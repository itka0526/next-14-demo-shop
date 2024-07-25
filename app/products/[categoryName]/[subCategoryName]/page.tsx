import { ProductCard } from "@/components/products/ProductCard";
import { ProductCardsWrapper } from "@/components/products/ProductCardsWrapper";
import prisma from "@/lib/db";
import { Product } from "@prisma/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    readonly params: { readonly categoryName: string; readonly subCategoryName: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const subCategory = await prisma.subCategory.findUnique({
        where: { subCategoryName: params.subCategoryName },
        select: { subCategoryDisplayName: true },
    });
    return {
        title: subCategory?.subCategoryDisplayName ?? "Алдаа",
    };
}

export default async function Page({ params: { categoryName, subCategoryName } }: Props) {
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
