import Image from "next/image";
import { Button } from "../ui/button";

export function ProductCard() {
    return (
        <div className="grid gap-4 bg-card p-4 rounded-lg shadow-sm">
            <Image src="/placeholder.svg" alt="Cozy Blanket" width={300} height={300} className="rounded-md object-cover w-full aspect-square" />
            <div className="grid gap-2">
                <h3 className="font-semibold text-lg">Cozy Blanket</h3>
                <p className="text-muted-foreground text-sm">Warm and Soft for Chilly Nights</p>
                <div className="flex items-center justify-between">
                    <span className="font-semibold text-2xl">$29.99</span>
                    <Button variant="outline" className="px-4 py-2">
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
}
