import { Button } from "@/components/ui/button";
import { Ratings } from "@/components/ui/ratings";
import { Stars } from "@/components/ui/stars";
import prisma from "@/lib/db";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params: { productName } }: { readonly params: { readonly productName: string } }) {
    const product = await prisma.product.findUnique({
        where: { productName },
        select: {
            subCategory: {
                select: {
                    subCategoryName: true,
                    subCategoryDisplayName: true,
                    category: { select: { categoryName: true, categoryDisplayName: true } },
                },
            },
            id: true,
            thumbnail_1: true,
            thumbnail_2: true,
            thumbnail_3: true,
            productDisplayName: true,
            description: true,
            imageUrl: true,
            price: true,
        },
    });

    // TODO: Implement product skeleton.
    if (!product) {
        return <></>;
    }

    const {
        subCategory: {
            subCategoryName,
            subCategoryDisplayName,
            category: { categoryName, categoryDisplayName },
        },
        id: productId,
        thumbnail_1,
        thumbnail_2,
        thumbnail_3,
        productDisplayName,
        imageUrl,
        description,
        price,
    } = product;

    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 md:px-0">
            <div className="grid gap-6">
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-5 md:col-span-4 rounded-lg overflow-hidden justify-self-start self-start">
                        <Image src={imageUrl} alt={productName} width={800} height={800} className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-5 md:col-span-1 grid gap-4 justify-self-start self-start ">
                        <button className="border rounded-lg overflow-hidden justify-self-start self-start">
                            <Image src={thumbnail_1} alt="Thumbnail 1" width={100} height={100} className="w-full h-full object-cover" />
                        </button>
                        <button className="border rounded-lg overflow-hidden justify-self-start self-start">
                            <Image src={thumbnail_2} alt="Thumbnail 2" width={100} height={100} className="w-full h-full object-cover" />
                        </button>
                        <button className="border rounded-lg overflow-hidden justify-self-start self-start">
                            <Image src={thumbnail_3} alt="Thumbnail 3" width={100} height={100} className="w-full h-full object-cover" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold">{productDisplayName}</h1>
                    <p className="text-muted-foreground">
                        <Link href={`/products/${categoryName}`}>{categoryDisplayName}</Link>
                        {" > "}
                        <Link href={`/products/${categoryName}/${subCategoryName}`}>{subCategoryDisplayName}</Link>
                        {" > "}
                        <Link href={`/details/${productName}`}>
                            {productDisplayName.slice(0, 50) + (productDisplayName.length > 50 ? "..." : "")}
                        </Link>
                    </p>
                </div>
                <Ratings productId={productId} />
                <div className="text-4xl font-bold">{price.toLocaleString()}₮</div>
                <div>
                    <Button size="lg" className="w-full">
                        Сагсанд нэмэх
                    </Button>
                </div>
                <div className="grid gap-4 text-sm leading-loose text-muted-foreground">
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}
