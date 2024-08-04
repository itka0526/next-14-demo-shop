import { UploadDropzone } from "@/components/uploadthing/utils";
import { ApiResponse, ImageUploadResponse } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Image as ImageType } from "@prisma/client";
import Image from "next/image";
import { Dispatch, SetStateAction, Suspense, useState } from "react";
import toast from "react-hot-toast";
import { ClientUploadedFileData } from "uploadthing/types";

export function SelectImages({
    images,
    setImages,
    productId,
}: {
    images: ImageType[];
    setImages: Dispatch<SetStateAction<ImageType[]>>;
    productId: number;
}) {
    const [pictures, setPictures] = useState<{ selected: boolean; image: ImageType }[]>(images.map((image) => ({ selected: true, image })));
    const handleClick = (imageId: number) => {
        setPictures((prev) => prev.map(({ selected, image }) => ({ selected: image.id === imageId ? !selected : selected, image })));
    };
    const handleSave = () => {
        setImages(pictures.filter(({ selected }) => selected).map(({ image }) => image));
    };

    const handleUploadComplete = async (res: ClientUploadedFileData<ImageUploadResponse>[]) => {
        const imageIds = res
            .map(({ serverData }) => (serverData.success ? `${serverData.imageId}` : false))
            .filter((x) => typeof x === "string")
            .map((x) => Number(x));
        const resp = await fetch("/api/dashboard/products/edit/images", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, imageIds }),
        });
        const data = (await resp.json()) as ApiResponse;
        if (data.status && data.type === "updateImages") {
            toast.success(data.message);
            setImages(data.result);
        } else {
            toast.error(data.message);
        }
    };

    const [isHidden, setIsHidden] = useState(true);
    const toggle = () => setIsHidden((s) => !s);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {pictures.map(({ selected, image: { id, name, url } }) => {
                    return (
                        <button
                            onClick={() => handleClick(id)}
                            className={cn(
                                "border rounded-lg overflow-hidden justify-self-start self-start w-full",
                                selected ? "border-neutral-950" : ""
                            )}
                            key={`small-image-${id}`}
                        >
                            <Image
                                src={url}
                                alt={name}
                                width={100}
                                height={100}
                                className="w-full h-full object-cover"
                                quality={25}
                                draggable={false}
                            />
                        </button>
                    );
                })}
                <button></button>
            </div>
            {!isHidden && (
                <div>
                    <h3 className="font-bold text-lg">Зурагнууд нэмэх</h3>
                    <div className="grid gap-2">
                        <Suspense fallback={"Уншиж байна..."}>
                            <UploadDropzone endpoint="imageUploader" onClientUploadComplete={handleUploadComplete} />
                        </Suspense>
                    </div>
                </div>
            )}
            <div className="flex gap-4">
                <button className="btn" disabled={!isHidden} onClick={toggle}>
                    Нэмэх
                </button>
                <button className="btn" onClick={handleSave}>
                    Хадгалах
                </button>
            </div>
        </>
    );
}
