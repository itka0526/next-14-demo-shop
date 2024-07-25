import { CategorySidebar } from "@/components/category/category-sidebar";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductCardsWrapper } from "@/components/products/ProductCardsWrapper";
import prisma from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { readonly params: { readonly categoryName: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const category = await prisma.category.findUnique({ where: { categoryName: params.categoryName }, select: { categoryDisplayName: true } });
    return {
        title: category?.categoryDisplayName ?? "Алдаа",
    };
}

export default async function Page({ params: { categoryName } }: Props) {
    const data = await prisma.category.findUnique({
        where: { categoryName },
        select: { subCategories: { select: { products: true } } },
    });

    if (!data) return notFound();

    return (
        <div className="flex min-h-screen w-full">
            <ul className="hidden w-1/4 bg-muted/40 p-6 md:flex flex-col gap-4">
                <CategorySidebar categoryName={categoryName} />
            </ul>
            <ProductCardsWrapper>
                {data.subCategories.map((subCategory) => {
                    return subCategory.products.map((product) => <ProductCard key={`product-${product.id}`} {...product} />);
                })}
            </ProductCardsWrapper>
        </div>
    );
}
