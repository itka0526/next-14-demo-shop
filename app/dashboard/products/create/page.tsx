import { CreateProduct } from "@/components/forms/create-product";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";

export default async function Page() {
    const subCategories = (await prisma.subCategory.findMany({ select: { id: true, subCategoryDisplayName: true } })) ?? [];
    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Шинэ бүтээгдэхүүн үүсгэх</CardTitle>
                <CardDescription>Шинэ бүтээгдэхүүн нэмэхийн тулд маягтыг бөглөнө үү.</CardDescription>
            </CardHeader>
            <CardContent>
                <CreateProduct subCategories={subCategories} />
            </CardContent>
        </Card>
    );
}
