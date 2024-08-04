import { UploadDropzone } from "@/components/uploadthing/utils";
import { fetchJson } from "@/lib/swr-client";
import { ApiResponse, ImageUploadResponse, UploadThingHeaderTypes } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Image as ImageType } from "@prisma/client";
import Image from "next/image";
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";
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
    const handleSave = async () => {
        setImages(pictures.filter(({ selected }) => selected).map(({ image }) => image));
        const data = await fetchJson<ApiResponse>("/api/dashboard/products/edit/images", {
            method: "PUT",
            body: JSON.stringify({ productId, images: pictures.filter(({ selected }) => selected).map(({ image }) => image) }),
        });
        if (data.status && data.type === "updateImages") {
            toast.success(data.message);
            setImages(data.result);
        } else {
            toast.error(data.message);
        }
    };

    const handleUploadComplete = async (res: ClientUploadedFileData<ImageUploadResponse>[]) => {
        const dbImages = res.map((x) => (x.serverData.type === "image" ? x.serverData.dbImage : null)).filter(<T,>(x: T | null) => x !== null);
        setImages((prev) => [...prev, ...dbImages]);
        if (res.length > 0 && res[0].serverData.success) toast.success("Амжилттай");
        else toast.error("Алдаа");
    };

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
            </div>
            <div>
                <h3 className="font-bold text-lg">Зурагнууд нэмэх</h3>
                <div className="grid gap-2">
                    <Suspense fallback={"Уншиж байна..."}>
                        <UploadDropzone
                            config={{ appendOnPaste: true }}
                            headers={{ type: "uploadMoreImages" as UploadThingHeaderTypes, productId: `${productId}` }}
                            endpoint="imageUploader"
                            onClientUploadComplete={handleUploadComplete}
                        />
                    </Suspense>
                </div>
            </div>
            <div className="flex gap-4">
                <button className="btn" onClick={handleSave}>
                    Хадгалах
                </button>
            </div>
        </>
    );
}
