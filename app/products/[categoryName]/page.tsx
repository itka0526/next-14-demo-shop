import { CategorySidebar } from "@/components/category/category-sidebar";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductCardsWrapper } from "@/components/products/ProductCardsWrapper";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export default async function Page({ params: { categoryName } }: { params: { categoryName: string } }) {
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
