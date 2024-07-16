import { Button } from "@/components/ui/button";
import Image from "next/image";

export function ProductCard() {
    return (
        <section className="w-full py-12">
            <div className="container grid gap-8 px-4 md:px-6">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <div className="grid gap-4 bg-card p-4 rounded-lg shadow-sm">
                        <Image
                            src="/placeholder.svg"
                            alt="Cozy Blanket"
                            width={300}
                            height={300}
                            className="rounded-md object-cover w-full aspect-square"
                        />
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
                    <div className="grid gap-4 bg-card p-4 rounded-lg shadow-sm">
                        <Image
                            src="/placeholder.svg"
                            alt="Autumn Mug"
                            width={300}
                            height={300}
                            className="rounded-md object-cover w-full aspect-square"
                        />
                        <div className="grid gap-2">
                            <h3 className="font-semibold text-lg">Autumn Mug</h3>
                            <p className="text-muted-foreground text-sm">Enjoy Your Hot Beverages in Style</p>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-2xl">$12.99</span>
                                <Button variant="outline" className="px-4 py-2">
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 bg-card p-4 rounded-lg shadow-sm">
                        <Image
                            src="/placeholder.svg"
                            alt="Fall Fragrance Candle"
                            width={300}
                            height={300}
                            className="rounded-md object-cover w-full aspect-square"
                        />
                        <div className="grid gap-2">
                            <h3 className="font-semibold text-lg">Fall Fragrance Candle</h3>
                            <p className="text-muted-foreground text-sm">Fill Your Space with a Cozy Scent</p>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-2xl">$16.99</span>
                                <Button variant="outline" className="px-4 py-2">
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 bg-card p-4 rounded-lg shadow-sm">
                        <Image
                            src="/placeholder.svg"
                            alt="Autumn Leaves Wall Art"
                            width={300}
                            height={300}
                            className="rounded-md object-cover w-full aspect-square"
                        />
                        <div className="grid gap-2">
                            <h3 className="font-semibold text-lg">Autumn Leaves Wall Art</h3>
                            <p className="text-muted-foreground text-sm">Decorate Your Space with Natures Beauty</p>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-2xl">$39.99</span>
                                <Button variant="outline" className="px-4 py-2">
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 bg-card p-4 rounded-lg shadow-sm">
                        <Image
                            src="/placeholder.svg"
                            alt="Fall Harvest Wreath"
                            width={300}
                            height={300}
                            className="rounded-md object-cover w-full aspect-square"
                        />
                        <div className="grid gap-2">
                            <h3 className="font-semibold text-lg">Fall Harvest Wreath</h3>
                            <p className="text-muted-foreground text-sm">Welcome the Season with a Beautiful Wreath</p>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-2xl">$49.99</span>
                                <Button variant="outline" className="px-4 py-2">
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 bg-card p-4 rounded-lg shadow-sm">
                        <Image
                            src="/placeholder.svg"
                            alt="Spiced Apple Cider Syrup"
                            width={300}
                            height={300}
                            className="rounded-md object-cover w-full aspect-square"
                        />
                        <div className="grid gap-2">
                            <h3 className="font-semibold text-lg">Spiced Apple Cider Syrup</h3>
                            <p className="text-muted-foreground text-sm">Enhance Your Drinks with Delicious Syrup</p>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-2xl">$12.99</span>
                                <Button variant="outline" className="px-4 py-2">
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 bg-card p-4 rounded-lg shadow-sm">
                        <Image
                            src="/placeholder.svg"
                            alt="Fall Foliage Table Runner"
                            width={300}
                            height={300}
                            className="rounded-md object-cover w-full aspect-square"
                        />
                        <div className="grid gap-2">
                            <h3 className="font-semibold text-lg">Fall Foliage Table Runner</h3>
                            <p className="text-muted-foreground text-sm">Decorate Your Table with Autumn Leaves</p>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-2xl">$19.99</span>
                                <Button variant="outline" className="px-4 py-2">
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 bg-card p-4 rounded-lg shadow-sm">
                        <Image
                            src="/placeholder.svg"
                            alt="Fall Fashion Hat"
                            width={300}
                            height={300}
                            className="rounded-md object-cover w-full aspect-square"
                        />
                        <div className="grid gap-2">
                            <h3 className="font-semibold text-lg">Fall Fashion Hat</h3>
                            <p className="text-muted-foreground text-sm">Complete Your Autumn Outfit with a Stylish Hat</p>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-2xl">$24.99</span>
                                <Button variant="outline" className="px-4 py-2">
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
