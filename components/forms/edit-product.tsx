"use client";

import { Product } from "@prisma/client";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

export function EditProduct({
    product: { productDisplayName, productName, description, featured, price, subCategoryId, id },
    subCategories,
}: {
    product: Product;
    subCategories: {
        id: number;
        subCategoryDisplayName: string;
    }[];
}) {
    return (
        <form>
            <Card className="w-full max-w-4xl">
                <CardHeader>
                    <CardTitle>Бүтээгдэхүүнийг засах ID: ({id})</CardTitle>
                    <CardDescription>Дэлгэрэнгүй мэдээллийг шинэчлэх.​</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="productDisplayName">Дэлгэцний нэр</Label>
                                <Input id="productDisplayName" type="text" name="productDisplayName" value={productDisplayName} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="productName">Нэр</Label>
                                <Input id="productName" type="text" name="productName" value={productName} />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Тайлбар</Label>
                            <Textarea id="description" value={description} className="min-h-32" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="images">Зурагнууд</Label>
                            <div />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="price">Үнэ</Label>
                                <Input id="price" type="number" value={price} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="featured" className="flex items-center gap-2">
                                    <Checkbox id="featured" />
                                    Онцлох
                                </Label>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="subcategory">Бүтээгдэхүүний ангилал</Label>
                            <Select value={subCategories.find(({ id }) => id === subCategoryId)?.subCategoryDisplayName}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select sub category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {subCategories.map(({ id, subCategoryDisplayName }) => (
                                        <SelectItem value="clothing" key={`subCategory-${id}`}>
                                            {subCategoryDisplayName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="justify-end">
                    <Button type="submit">Save</Button>
                </CardFooter>
            </Card>
        </form>
    );
}
