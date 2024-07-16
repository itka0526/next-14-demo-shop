import { ProductCard } from "@/components/products/ProductCard";

export default function Home() {
    return (
        <section className="w-full py-12">
            <div className="container grid gap-8 px-4 md:px-6">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <ProductCard />
                </div>
            </div>
        </section>
    );
}
