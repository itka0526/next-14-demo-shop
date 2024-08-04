import prisma from "@/lib/db";
import { getSession } from "@/lib/session-server";
import { ImageUploadResponse, UploadThingHeaderTypes } from "@/lib/types";
import { headers } from "next/headers";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 25, minFileCount: 1 } })
        .middleware(async () => {
            const session = await getSession();
            if (!session.userId || session.userRole !== "ADMIN") {
                throw new UploadThingError("Unauthorized");
            }
            const user = await prisma.user.findUnique({ where: { id: session.userId } });
            if (!user) {
                throw new UploadThingError("Unknown user");
            }
            let type: UploadThingHeaderTypes;
            switch (headers().get("type")) {
                case "uploadMoreImages":
                    type = "uploadMoreImages";
                    break;
                default:
                    type = "basic";
                    break;
            }
            return { username: user.name, type: type, productId: Number(headers().get("productId")) };
        })
        .onUploadComplete(async ({ metadata, file: { key, name, size, type, url } }) => {
            if (metadata.type === "uploadMoreImages") {
                // For update product. I could just upload the images in one call.
                try {
                    const data = await prisma.image.create({ data: { key, name, size, type, url, productId: metadata.productId } });
                    return createUploadCompleteResponse({ type: "image", dbImage: data, success: true, uploadedBy: metadata.username });
                } catch (error) {
                    console.error(error);
                    return createUploadCompleteResponse({
                        success: false,
                        message: "Зураг оруулах боломжгүй байна.",
                        type: "default",
                        uploadedBy: metadata.username,
                    });
                }
            }
            // For create product
            try {
                const temporaryImage = await prisma.temporaryImage.create({ data: { name, size, type, key, url }, select: { id: true } });
                if (!temporaryImage) {
                    throw new UploadThingError("Failed to create a temporary image record.");
                }
                return createUploadCompleteResponse({
                    type: "temporaryImage",
                    uploadedBy: metadata.username,
                    success: true,
                    temproraryImageId: temporaryImage.id,
                });
            } catch (error) {
                console.error(error);
                return createUploadCompleteResponse({
                    type: "default",
                    uploadedBy: metadata.username,
                    success: false,
                    message: "Сервер дээр алдаа гарлаа.",
                });
            }
        }),
} satisfies FileRouter;

function createUploadCompleteResponse(data: ImageUploadResponse): ImageUploadResponse {
    if (data.type === "temporaryImage") {
        return {
            type: data.type,
            uploadedBy: data.uploadedBy,
            success: data.success,
            temproraryImageId: data.temproraryImageId,
        };
    } else if (data.type === "image") {
        return {
            uploadedBy: data.uploadedBy,
            success: data.success,
            type: "image",
            dbImage: data.dbImage,
        };
    } else if (!data.success) {
        return {
            uploadedBy: data.uploadedBy,
            success: data.success,
            message: data.message,
            type: "default",
        };
    } else {
        return {
            uploadedBy: "Unknown",
            success: false,
            message: "Алдаа",
            type: "default",
        };
    }
}

export type OurFileRouter = typeof ourFileRouter;
