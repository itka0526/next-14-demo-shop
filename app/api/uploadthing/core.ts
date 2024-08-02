import prisma from "@/lib/db";
import { getSession } from "@/lib/session-server";
import { ImageUploadResponse } from "@/lib/types";
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
            return { username: user.name };
        })
        .onUploadComplete(async ({ metadata, file: { key, name, size, type, url } }) => {
            try {
                const image = await prisma.image.create({ data: { name, size, type, key, url } });
                if (!image) {
                    return createUploadCompleteResponse({ uploadedBy: metadata.username, success: false, message: "Зураг алга байна." });
                }
                return createUploadCompleteResponse({
                    uploadedBy: metadata.username,
                    success: true,
                    imageId: image.id,
                });
            } catch (error) {
                console.error(error);
                return createUploadCompleteResponse({ uploadedBy: metadata.username, success: false, message: "Сервер дээр алдаа гарлаа." });
            }
        }),
} satisfies FileRouter;

function createUploadCompleteResponse(data: ImageUploadResponse): ImageUploadResponse {
    if (data.success) {
        return { uploadedBy: data.uploadedBy, success: data.success, imageId: data.imageId };
    } else {
        return { uploadedBy: data.uploadedBy, success: data.success, message: data.message };
    }
}

export type OurFileRouter = typeof ourFileRouter;
