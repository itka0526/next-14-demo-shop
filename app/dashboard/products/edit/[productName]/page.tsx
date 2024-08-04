import { EditProduct } from "@/components/forms/edit-product";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export default async function Page({ params: { productName: undecodedProductName } }: { params: { productName: string } }) {
    const product = await prisma.product.findUnique({
        where: { productName: decodeURI(undecodedProductName) },
        select: {
            id: true,
            subCategoryId: true,
            productDisplayName: true,
            productName: true,
            description: true,
            images: true,
            price: true,
            featured: true,
        },
    });
    if (!product) {
        notFound();
    }
    const subCategories = await prisma.subCategory.findMany({ select: { subCategoryDisplayName: true, id: true } });
    return <EditProduct product={product} subCategories={subCategories} />;
}
