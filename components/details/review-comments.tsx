import prisma from "@/lib/db";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Suspense } from "react";
import { CommentUserSkeleton } from "../skeletons/comment-user-skeleton";

export async function ReviewComments({ productId }: { productId: number }) {
    const reviews = await prisma.review.findMany({ where: { productId } });
    return (
        <div className="grid gap-6 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Хэрэглэгчийн Сэтгэгдэл</h2>
            {reviews.map(({ id: reviewId, userId, comment, stars, updatedAt: commentAt }) => {
                return (
                    <div className="flex flex-col items-start gap-2" key={`review-${reviewId}`}>
                        <Suspense fallback={<CommentUserSkeleton />}>
                            <CommentUser commentAt={commentAt} userId={userId} />
                        </Suspense>
                        <div className="grid gap-1.5">
                            <p className="pl-14">{comment}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

async function CommentUser({ userId, commentAt }: { userId: number; commentAt: Date }) {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { avatarImage: true, name: true } });
    return (
        <div className="flex gap-4 items-center">
            <Avatar className="w-10 h-10 border overflow-hidden rounded-md">
                <AvatarImage src={user?.avatarImage ?? "/placeholder-user.jpg"} />
            </Avatar>
            <div className="flex items-center gap-2">
                <div className="font-semibold">@{user?.name ?? "unknown"}</div>
                <div className="text-xs text-muted-foreground">{commentAt.toUTCString()}</div>
            </div>
        </div>
    );
}
