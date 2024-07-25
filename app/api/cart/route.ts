import prisma from "@/lib/db";
import { getSession } from "@/lib/session-server";
import { AddToCartItemSchema, ApiResponse, DeleteFromCartSchema } from "@/lib/types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse<ApiResponse>> {
    const session = await getSession();
    if (!session.userId) {
        return NextResponse.json({ message: "Та эхлээд нэвтэрнэ үү.", status: false });
    }
    const url = new URL(request.url);
    const productId = url.searchParams.get("id");
    if (!productId) {
        return NextResponse.json({
            message: "Амжилттай.",
            type: "basketedItems",
            status: true,
            result: await prisma.basketedItem.findMany({ where: { userId: session.userId } }),
        });
    } else {
        try {
            const product = await prisma.product.findUnique({ where: { id: Number(productId) } });
            if (!product) throw new Error("Product does not exist.");
            return NextResponse.json({
                message: "Амжилттай.",
                status: true,
                type: "product",
                result: product,
            });
        } catch (error) {
            console.log(error);
            return NextResponse.json({
                message: "Сервер дээр алдаа гарлаа.",
                status: false,
            });
        }
        1;
    }
}

export async function POST(request: Request): Promise<NextResponse<ApiResponse>> {
    const session = await getSession();
    if (!session.userId) {
        return NextResponse.json({ message: "Та эхлээд нэвтэрнэ үү.", status: false });
    }

    let data = { ...(await request.json()), userId: session.userId };
    const validatedFields = AddToCartItemSchema.safeParse(data);
    if (!validatedFields.success) {
        return NextResponse.json({ message: "Алдаатай талбаруудтай байна.", status: false });
    }

    try {
        await prisma.basketedItem.create({ data: validatedFields.data });
        return NextResponse.json({
            message: "Амжилттай.",
            type: "basketedItems",
            status: true,
            result: await prisma.basketedItem.findMany({ where: { userId: session.userId } }),
        });
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            switch (error.code) {
                // https://www.prisma.io/docs/orm/reference/error-reference
                case "P2002":
                    return NextResponse.json({
                        message: "Та аль хэдийн энэ барааг сагсалсан байна.",
                        status: false,
                    });
                default:
                    return NextResponse.json({
                        message: "Өгөгдлийн санд одоогоор бүртгэх боломжгүй байна.",
                        status: false,
                    });
            }
        }
        console.error(error);
        return NextResponse.json({
            message: "Сервер дээр алдаа гарлаа.",
            status: false,
        });
    }
}

export async function DELETE(request: Request): Promise<NextResponse<ApiResponse>> {
    const session = await getSession();
    if (!session.userId) {
        return NextResponse.json({ message: "Та эхлээд нэвтэрнэ үү.", status: false });
    }
    let data = { ...(await request.json()), userId: session.userId };
    const validatedFields = DeleteFromCartSchema.safeParse(data);
    if (!validatedFields.success) {
        return NextResponse.json({ message: "Алдаатай талбаруудтай байна.", status: false });
    }

    const { productId, userId } = validatedFields.data;
    try {
        await prisma.basketedItem.deleteMany({
            where: { AND: [{ productId }, { userId }] },
        });
        return NextResponse.json({
            message: "Амжилттай.",
            status: true,
            type: "basketedItems",
            result: await prisma.basketedItem.findMany({ where: { userId: session.userId } }),
        });
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            switch (error.code) {
                // https://www.prisma.io/docs/orm/reference/error-reference
                case "P2002":
                    return NextResponse.json({
                        message: "Та аль хэдийн энэ барааг сагсалсан байна.",
                        status: false,
                    });
                default:
                    return NextResponse.json({
                        message: "Өгөгдлийн санд одоогоор бүртгэх боломжгүй байна.",
                        status: false,
                    });
            }
        }
        console.error(error);
        return NextResponse.json({
            message: "Сервер дээр алдаа гарлаа.",
            status: false,
        });
    }
}
