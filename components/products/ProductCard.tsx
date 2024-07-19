import Image from "next/image";
import { Product } from "@prisma/client";
import Link from "next/link";

export function ProductCard({ title, description, imageUrl, price }: Product) {
    return (
        <div className="relative overflow-hidden rounded-lg group">
            {/** TODO: Implement details page. */}
            <Link href="/" className="absolute inset-0 z-0" prefetch={false}>
                <span className="sr-only">View {title}</span>
            </Link>
            <Image
                src={imageUrl}
                alt={title}
                width={400}
                height={300}
                className="object-cover w-full h-60 group-hover:opacity-50 transition-opacity"
            />
            <div className="p-4 bg-background">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
                <h4 className="text-base font-semibold">{price}₮</h4>
            </div>
        </div>
    );
}
