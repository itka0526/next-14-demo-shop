"use client";

import { cn } from "@/lib/utils";
import { Image as ImageType } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

type ImagesProps = Omit<ImageType, "size" | "type" | "key" | "productId">[];
const QUALITY = { main: 100, thumbnail: 25 };

export function Images({ images }: { images: ImagesProps }) {
    const [index, setIndex] = useState<number>(0);
    const thumbnailRef = useRef<HTMLButtonElement>(null);
    const updateIndex = (value: "left" | "right" | number) => {
        if (value === "left") {
            setIndex((prevIndex) => (prevIndex - 1 > 0 ? prevIndex - 1 : images.length - 1));
        } else if (value === "right") {
            setIndex((prevIndex) => {
                const newIndex = prevIndex + 1 < images.length ? prevIndex + 1 : 0;
                if (newIndex === 0) {
                    if (thumbnailRef.current && thumbnailRef.current.parentElement) {
                        thumbnailRef.current.parentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    }
                }
                return newIndex;
            });
        } else {
            setIndex(value);
        }
        if (thumbnailRef.current && thumbnailRef.current.parentElement) {
            thumbnailRef.current.parentElement.scrollTo({
                top: 0,
                left: thumbnailRef.current.offsetLeft - thumbnailRef.current.parentElement.offsetLeft,
                behavior: "smooth",
            });
        }
    };
    return (
        <div className="grid">
            <div
                className="
                    rounded-lg overflow-hidden
                    relative w-full mb-4
                    "
            >
                <div className="w-full h-full">
                    <Image
                        priority
                        src={images[index].url}
                        alt={images[index].name}
                        height={800}
                        width={800}
                        layout="responsive"
                        className="w-full h-full object-cover"
                        quality={QUALITY.main}
                        placeholder="blur"
                        blurDataURL="/placeholder.svg"
                    />
                </div>
                <div className="left-0 top-0 absolute w-full h-full pointer-events-none flex justify-between items-center">
                    <button onClick={() => updateIndex("left")}>
                        <ChevronLeftIcon width={48} height={48} className="pointer-events-auto" />
                    </button>
                    <button>
                        <ChevronRightIcon width={48} height={48} className="pointer-events-auto" onClick={() => updateIndex("right")} />
                    </button>
                </div>
            </div>
            <div
                className="
                        justify-self-start self-start
                        grid w-full h-full grid-flow-col auto-cols-[25%]
                        gap-4 overflow-auto no-scrollbar
                        "
            >
                {images.map(({ id, name, url }, idx) => (
                    <button
                        className={cn(
                            "border rounded-lg overflow-hidden justify-self-start self-start w-full",
                            idx === index ? "border-neutral-950" : ""
                        )}
                        ref={idx === index ? thumbnailRef : null}
                        key={`small-image-${id}`}
                        onClick={() => updateIndex(idx)}
                    >
                        <Image
                            src={url}
                            alt={name}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                            quality={QUALITY.thumbnail}
                            draggable={false}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
