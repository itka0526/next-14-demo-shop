import { CategorySidebar } from "@/components/category/category-sidebar";
import { ProductCardsWrapper } from "@/components/products/ProductCardsWrapper";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export default async function Page({ params: { categoryName } }: { params: { categoryName: string } }) {
    const data = await prisma.category.findUnique({
        where: { categoryName },
        select: { subCategories: true },
    });

    if (!data) return notFound();

    return (
        <div>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
                <CategorySidebar unique={true} categoryName={categoryName} />
            </ul>
            <ProductCardsWrapper />
        </div>
    );
}
