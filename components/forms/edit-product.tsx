"use client";

import { Image as ImageType, Product } from "@prisma/client";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useFormState, useFormStatus } from "react-dom";
import { editProduct } from "@/lib/actions";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { PlusCircleIcon } from "lucide-react";
import { useModal } from "../hooks/useModal";
import { SelectImages } from "../dashboard/products/edit/select-images";

export function EditProduct({
    product: { productDisplayName, productName, description, featured, price, subCategoryId, id, images: initialImages },
    subCategories,
}: {
    product: Product & { images: ImageType[] };
    subCategories: {
        id: number;
        subCategoryDisplayName: string;
    }[];
}) {
    const defaultSubCategory = subCategories.find(({ id }) => id === subCategoryId)?.subCategoryDisplayName;
    const [images, setImages] = useState<ImageType[]>(initialImages);
    const [formState, formAction] = useFormState(editProduct, undefined);
    const { pending: isPending } = useFormStatus();
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
                setImages([]);
            }
        }
    }, [formState?.message, formState?.errors]);

    const { toggle, Modal, DefaultCloseButton } = useModal();

    return (
        <>
            <form ref={formRef} action={formAction}>
                <Card className="w-full max-w-4xl">
                    <CardHeader>
                        <CardTitle>Бүтээгдэхүүнийг засах ID: ({id})</CardTitle>
                        <input readOnly={true} className="hidden w-0 h-0" type="number" name="productId" value={id} />
                        <CardDescription>Дэлгэрэнгүй мэдээллийг шинэчлэх.​</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="productDisplayName">Дэлгэцний нэр</Label>
                                    <Input id="productDisplayName" type="text" name="productDisplayName" defaultValue={productDisplayName} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="productName">Нэр</Label>
                                    <Input id="productName" type="text" name="productName" defaultValue={productName} />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Тайлбар</Label>
                                <Textarea id="description" name="description" defaultValue={description} className="min-h-32" />
                            </div>
                            <div className="grid gap-2">
                                <Label>Зурагнууд</Label>
                                <div
                                    className="
                                    justify-self-start self-start
                                    grid w-full h-full grid-flow-col auto-cols-[25%]
                                    gap-4 overflow-auto
                                "
                                >
                                    <Button className="h-full w-full" type="button" onClick={toggle}>
                                        <PlusCircleIcon className="h-1/2 w-1/2" />
                                    </Button>

                                    {images.map(({ id, name, url }, idx) => (
                                        <button
                                            className="border rounded-lg overflow-hidden justify-self-start self-start w-full"
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
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Үнэ</Label>
                                    <Input id="price" type="number" name="price" defaultValue={price} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="featured" className="flex items-center gap-2">
                                        <Checkbox id="featured" name="featured" defaultChecked={featured} />
                                        Онцлох
                                    </Label>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="subCategoryId">Бүтээгдэхүүний ангилал</Label>
                                <Select defaultValue={`${subCategoryId}`} name="subCategoryId">
                                    <SelectTrigger>
                                        <SelectValue placeholder={defaultSubCategory} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subCategories.map(({ id, subCategoryDisplayName }) => (
                                            <SelectItem value={`${id}`} key={`subCategory-${id}`}>
                                                {subCategoryDisplayName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Button type="submit" disabled={isPending}>
                            Хадгалах
                        </Button>
                    </CardFooter>
                </Card>
            </form>
            <Modal>
                <h3 className="font-bold text-lg">Зурагнууд сонгох</h3>
                <SelectImages images={images} setImages={setImages} productId={id} />
                <DefaultCloseButton />
            </Modal>
        </>
    );
}
