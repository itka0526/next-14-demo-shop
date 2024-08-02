import { AddToCart } from "@/components/details/add-to-cart";
import { ReviewComments } from "@/components/details/review-comments";
import { Ratings } from "@/components/ui/ratings";
import prisma from "@/lib/db";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { readonly params: { readonly productName: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const product = await prisma.product.findUnique({
        where: { productName: params.productName },
        select: { productDisplayName: true, description: true },
    });
    if (!product) {
        return {
            title: "",
            description: "",
        };
    } else {
        return {
            title: product.productDisplayName.length > 24 ? product.productDisplayName.slice(0, 21) + "..." : product.productDisplayName,
            description: product?.description ?? "",
        };
    }
}

export default async function Page({ params: { productName } }: Props) {
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
            productDisplayName: true,
            description: true,
            images: true,
            price: true,
        },
    });

    if (!product) {
        return notFound();
    }

    const {
        subCategory: {
            subCategoryName,
            subCategoryDisplayName,
            category: { categoryName, categoryDisplayName },
        },
        id: productId,
        images,
        productDisplayName,
        description,
        price,
    } = product;

    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 md:px-0">
            <div className="grid gap-6">
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-5 md:col-span-4 rounded-lg overflow-hidden justify-self-start self-start">
                        <Image src={"/placeholder.svg"} alt={productName} width={800} height={800} className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-5 md:col-span-1 grid gap-4 justify-self-start self-start ">
                        <button className="border rounded-lg overflow-hidden justify-self-start self-start">
                            <Image src={"/placeholder.svg"} alt="Thumbnail 1" width={100} height={100} className="w-full h-full object-cover" />
                        </button>
                        <button className="border rounded-lg overflow-hidden justify-self-start self-start">
                            <Image src={"/placeholder.svg"} alt="Thumbnail 2" width={100} height={100} className="w-full h-full object-cover" />
                        </button>
                        <button className="border rounded-lg overflow-hidden justify-self-start self-start">
                            <Image src={"/placeholder.svg"} alt="Thumbnail 3" width={100} height={100} className="w-full h-full object-cover" />
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
                <AddToCart productId={productId} />
                <div className="grid gap-4 text-sm leading-loose text-muted-foreground">
                    <p>{description}</p>
                </div>
            </div>
            <ReviewComments productId={productId} />
        </div>
    );
}
