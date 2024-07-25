import prisma from "@/lib/db";
import { PopularCategory } from "./popular-category";

export async function PopularCategories({
    defaultStyles = "group flex flex-col items-center justify-center space-y-2 rounded-lg bg-background p-4 transition-all hover:bg-accent hover:text-accent-foreground",
}: {
    defaultStyles?: string;
}) {
    const popularCategories = await prisma.category.findMany({ select: { id: true, categoryName: true, categoryDisplayName: true } });
    return popularCategories.map((category) => (
        <PopularCategory key={`popular-category-${category.id}`} {...category} defaultStyles={defaultStyles} />
    ));
}
