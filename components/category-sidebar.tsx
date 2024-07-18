"use server";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Link from "next/link";
import { NavbarButtons } from "./ui/navbarButtons";
import prisma from "@/lib/db";

export async function CategorySidebar() {
    const data = await prisma.category.findMany({
        select: {
            id: true,
            categoryName: true,
            categoryDisplayName: true,
            subCategories: {
                select: {
                    id: true,
                    subCategoryName: true,
                    subCategoryDisplayName: true,
                },
            },
        },
    });

    return (
        <>
            <div className="bg-background p-4 my-4 rounded-md flex-col space-y-2">
                <h3 className="text-xl font-semibold">Ангилал</h3>
            </div>
            <div className="flex flex-col h-full bg-background rounded-md">
                <div className="flex-1 overflow-auto ">
                    {data.map(({ id: categoryId, categoryName, subCategories, categoryDisplayName }) => {
                        return (
                            <Accordion type="single" collapsible key={`categoryId-${categoryId}`}>
                                <AccordionItem value="electronics">
                                    <AccordionTrigger className="flex items-center justify-between px-6 py-4 hover:bg-muted transition-colors">
                                        <Link href={`/products/${categoryName}`} className="flex items-center gap-4" prefetch={false}>
                                            <span className="font-medium">{categoryDisplayName}</span>
                                        </Link>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 py-4 space-y-2">
                                        {subCategories.map(({ id: subCategoryId, subCategoryName, subCategoryDisplayName }) => {
                                            return (
                                                <Link
                                                    key={`subCategoryId-${subCategoryId}`}
                                                    href={`/products/${categoryName}/${subCategoryName}`}
                                                    className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                                                    prefetch={false}
                                                >
                                                    <span>{subCategoryDisplayName}</span>
                                                </Link>
                                            );
                                        })}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        );
                    })}
                </div>
            </div>
            <ul className="bg-background p-4 my-4 rounded-md flex-col space-y-2 lg:hidden max-lg:flex">
                <NavbarButtons />
            </ul>
        </>
    );
}
