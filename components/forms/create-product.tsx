"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/components/uploadthing/utils";
import { createNewProduct } from "@/lib/actions";
import { ImageUploadResponse } from "@/lib/types";
import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { ClientUploadedFileData } from "uploadthing/types";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { SubCategory } from "@prisma/client";
import toast from "react-hot-toast";

export function CreateProduct({
    subCategories,
}: {
    subCategories: readonly { id: SubCategory["id"]; subCategoryDisplayName: SubCategory["subCategoryDisplayName"] }[];
}) {
    const [images, setImages] = useState<ClientUploadedFileData<ImageUploadResponse>[]>([]);
    const [formState, formAction] = useFormState(createNewProduct, undefined);
    const { pending: isPending } = useFormStatus();

    const handleUploadComplete = (res: ClientUploadedFileData<ImageUploadResponse>[]) => setImages(res);

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (formState?.errors && Object.keys(formState.errors).length > 0)
            Object.entries(formState.errors).map(([field, errMsgs]) => errMsgs.map((errMsg) => toast.error(`${errMsg} \nТалбар: '${field}'`)));
        else if (formState?.message) {
            if (formState.errors && Object.keys(formState.errors).length > 0) {
                toast.error(formState.message);
            } else {
                toast.success(formState.message);
                formRef.current && formRef?.current.reset();
            }
        }
    }, [formState?.message, formState?.errors]);

    return (
        <form ref={formRef} className="grid gap-6" action={images.length > 0 ? formAction : () => {}}>
            <div className="grid gap-2">
                <Suspense fallback={"Уншиж байна..."}>
                    <UploadDropzone endpoint="imageUploader" onClientUploadComplete={handleUploadComplete} />
                </Suspense>
            </div>
            <ul className="grid grid-cols-3 md:grid-cols-5 gap-4 w-full">
                <input
                    readOnly={true}
                    className="hidden w-0 h-0"
                    type="text"
                    name="images"
                    value={images
                        .map(({ serverData }) => (serverData.success ? `${serverData.imageId}` : false))
                        .filter(Boolean)
                        .join(",")}
                />
                {images.map(({ key, url, name }) => (
                    <li key={key} className="aspect-square relative">
                        <Image src={url} alt={name} fill quality={10} sizes="150px" className="object-contain" />
                    </li>
                ))}
            </ul>
            <div className="grid gap-2">
                <Label>Ангилал</Label>
                <Select name="subCategoryId">
                    <SelectTrigger>
                        <SelectValue placeholder="Ангилал сонгох" />
                    </SelectTrigger>
                    <SelectContent>
                        {subCategories.map(({ id, subCategoryDisplayName }) => (
                            <SelectItem key={`subCategory-${id}`} value={`${id}`}>
                                {subCategoryDisplayName}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="productDisplayName">Бүтээгдэхүүний нэр​</Label>
                <Input id="productDisplayName" name="productDisplayName" type="text" placeholder="Бүтээгдэхүүний нэр​ оруулна уу" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="productName">Бүтээгдэхүүний холбоос</Label>
                <Input id="productName" name="productName" type="text" placeholder="Бүтээгдэхүүний холбоос оруулна уу" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Тайлбар</Label>
                <Textarea id="description" name="description" placeholder="Бүтээгдэхүүний тайлбарыг оруулна уу" className="min-h-[120px]" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="price">Үнэ</Label>
                <Input id="price" name="price" type="number" step="0.01" placeholder="Бүтээгдэхүүний үнийг оруулна уу" />
            </div>
            <div className="flex items-center justify-between">
                <Label htmlFor="featured" className="flex items-center gap-2">
                    <Checkbox id="featured" name="featured" />
                    Онцлох
                </Label>
                <Button type="submit" disabled={isPending || images.length <= 0}>
                    Үүсгэх
                </Button>
            </div>
        </form>
    );
}
