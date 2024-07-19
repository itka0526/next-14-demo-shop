import Image from "next/image";
import { Button } from "../ui/button";
import { Product } from "@prisma/client";

export function ProductCard({ title, description, imageUrl, price }: Product) {
    return (
        <div className="grid gap-4 bg-card p-4 rounded-lg shadow-sm">
            <Image src={imageUrl} alt="Cozy Blanket" width={300} height={300} className="rounded-md object-cover w-full aspect-square" />
            <div className="grid gap-2">
                <h3 className="font-semibold text-lg">{title} </h3>
                <p className="text-muted-foreground text-sm">{description}</p>
                <div className="flex items-center justify-between">
                    <span className="font-semibold text-2xl">{price}₮</span>
                    <Button variant="outline" className="px-4 py-2">
                        Сагсанд нэмэх
                    </Button>
                </div>
            </div>
        </div>
    );
}
