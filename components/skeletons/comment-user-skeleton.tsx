import { Skeleton } from "../ui/skeleton";

export function CommentUserSkeleton() {
    return (
        <div className="flex gap-4 items-center">
            <Skeleton className="w-10 h-10 rounded-md" />
            <div className="flex items-center gap-2">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-16 h-4" />
            </div>
        </div>
    );
}
