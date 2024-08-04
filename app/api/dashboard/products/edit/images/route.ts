import prisma from "@/lib/db";
import { getSession } from "@/lib/session-server";
import { ApiResponse } from "@/lib/types";
import { NextResponse } from "next/server";
import { z } from "zod";

const RequestData = z.object({ productId: z.number(), imageIds: z.array(z.number()) });

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

    const validData = RequestData.safeParse(data);
    if (!validData.success) {
        return NextResponse.json({ message: "Буруу өгөгдөл", status: false });
    }
    const { imageIds, productId } = validData.data;
    try {
        const data = await prisma.product.update({
            where: { id: productId },
            data: { images: { connect: imageIds.map((x) => ({ id: x })) } },
            select: { images: true },
        });
        return NextResponse.json({ message: "Амжилттай", status: true, result: data.images, type: "updateImages" });
    } catch (error) {
        console.log("Дараа нь засна аа: ", error);
        return NextResponse.json({ message: "Өгөгдлийн бүртгэж чадсангүй", status: false });
    }
}
