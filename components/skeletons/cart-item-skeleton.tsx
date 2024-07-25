import { Skeleton } from "../ui/skeleton";

export function CartItemSkeleton() {
    return (
        <div className="w-full h-6 grid grid-cols-5 gap-4 my-2">
            <Skeleton className="bg-primary col-span-3" />
            <Skeleton className="bg-primary col-span-1" />
            <Skeleton className="bg-primary " />
        </div>
    );
}
