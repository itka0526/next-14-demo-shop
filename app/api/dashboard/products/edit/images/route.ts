import prisma from "@/lib/db";
import { getSession } from "@/lib/session-server";
import { ApiResponse, ImageSchema, ProductSchema } from "@/lib/types";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(request: Request): Promise<NextResponse<ApiResponse>> {
    const session = await getSession();
    if (!session.userId || session.userRole !== "ADMIN") {
        return NextResponse.json({ message: "Эхлээд нэвтэрнэ үү", status: false });
    }
    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    if (!user) {
        return NextResponse.json({ message: "Хэрэглэгч бүртгэлгүй байна", status: false });
    }
    let data = { ...(await request.json()) };
    const validData = z.object({ productId: z.number(), images: ImageSchema.array() }).safeParse(data);
    if (!validData.success) {
        return NextResponse.json({ message: "Буруу өгөгдөл", status: false });
    }
    const { images, productId } = validData.data;
    try {
        await prisma.product.update({ where: { id: productId }, data: { images: { deleteMany: {} } } });
        const { images: resultImages } = await prisma.product.update({
            where: { id: productId },
            data: { images: { createMany: { data: images.map(({ productId: _, ...rest }) => ({ ...rest })) } } },
            select: { images: true },
        });
        return NextResponse.json({ message: "Амжилттай", status: true, result: resultImages, type: "updateImages" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Өгөгдлийн сан дээр алдаа гарлаа", status: false });
    }
}
