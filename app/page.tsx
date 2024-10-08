import { PopularCategories } from "@/components/category/popularCategory/popular-categories";
import { Newsletter } from "@/components/forms/newsletter-form";
import { FeaturedProducts } from "@/components/home/featuredProducts";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductCardsWrapper } from "@/components/products/ProductCardsWrapper";
import { PopularCategoriesSkeleton } from "@/components/skeletons/popular-categories-skeleton";
import { ProductCardSkeleton } from "@/components/skeletons/product-card";
import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
    return (
        <div className="flex flex-col">
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted mt-4">
                <div className="container grid md:grid-cols-2 gap-8 px-4 md:px-6">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Танд зөвхөн зориулсан шилдэг бүтээгдэхүүнийг
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                Манай тусгайлан сонгосон өндөр чанартай бүтээгдэхүүний цуглуулгыг судалж, таны хэрэгцээнд тохирохыг олоорой.
                            </p>
                        </div>
                        <div>
                            <Link
                                href="#special-products"
                                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                prefetch={false}
                            >
                                Онцлох
                            </Link>
                        </div>
                    </div>
                    <Image
                        quality={80}
                        src="/landing.jpg"
                        width="600"
                        height="400"
                        alt="Landing Page"
                        className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover"
                    />
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32" id="special-products">
                <div className="container space-y-12 px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Онцлох бүтээгдэхүүнүүд</h2>
                        </div>
                    </div>
                    <Suspense
                        fallback={
                            <ProductCardsWrapper>
                                <ProductCardSkeleton />
                                <ProductCardSkeleton />
                                <ProductCardSkeleton />
                            </ProductCardsWrapper>
                        }
                    >
                        <FeaturedProducts />
                    </Suspense>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                <div className="container space-y-12 px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Алдартай ангиллууд</h2>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Таны хэрэгцээнд төгс тохирох бүтээгдэхүүнийг олоход манай өргөн хүрээний ангиллуудыг судлаарай.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        <Suspense fallback={<PopularCategoriesSkeleton />}>
                            <PopularCategories />
                        </Suspense>
                    </div>
                </div>
            </section>
            <Newsletter />
        </div>
    );
}
