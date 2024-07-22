import { Button } from "@/components/ui/button";

export function Details() {
    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 md:px-0">
            <div className="grid gap-6">
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-5 md:col-span-4 rounded-lg overflow-hidden">
                        <img src="/placeholder.svg" alt="Product Image" width={800} height={800} className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-5 md:col-span-1 grid gap-4">
                        <button className="border rounded-lg overflow-hidden">
                            <img src="/placeholder.svg" alt="Thumbnail 1" width={100} height={100} className="w-full h-full object-cover" />
                        </button>
                        <button className="border rounded-lg overflow-hidden">
                            <img src="/placeholder.svg" alt="Thumbnail 2" width={100} height={100} className="w-full h-full object-cover" />
                        </button>
                        <button className="border rounded-lg overflow-hidden">
                            <img src="/placeholder.svg" alt="Thumbnail 3" width={100} height={100} className="w-full h-full object-cover" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid gap-6">
                <div>
                    <h1 className="text-3xl font-bold">Acme Prism T-Shirt</h1>
                    <p className="text-muted-foreground">60% combed ringspun cotton/40% polyester jersey tee.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    </div>
                    <span className="text-muted-foreground text-sm">(4.3)</span>
                </div>
                <div className="text-4xl font-bold">$99</div>
                <div>
                    <Button size="lg" className="w-full">
                        Add to Cart
                    </Button>
                </div>
                <div className="grid gap-4 text-sm leading-loose text-muted-foreground">
                    <p>
                        Introducing the Acme Prism T-Shirt, a perfect blend of style and comfort for the modern individual. This tee is crafted with a
                        meticulous composition of 60% combed ringspun cotton and 40% polyester jersey, ensuring a soft and breathable fabric that
                        feels gentle against the skin.
                    </p>
                    <p>
                        The design of the Acme Prism T-Shirt is as striking as it is comfortable. The shirt features a unique prism-inspired pattern
                        that adds a modern and eye-catching touch to your ensemble.
                    </p>
                </div>
            </div>
        </div>
    );
}

function StarIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

function XIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
}
