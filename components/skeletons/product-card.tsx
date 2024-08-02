import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

export function ProductCardSkeleton() {
    return (
        <Skeleton className="relative overflow-hidden rounded-lg group">
            <Image src={"/placeholder.svg"} alt={"placeholder"} width={400} height={300} className="object-cover w-full h-full" />
            <Skeleton className="p-4 bg-background">
                <Skeleton className="h-4 bg-gray-300 mb-2"></Skeleton>
                <Skeleton className="h-3 bg-gray-300 mb-2 w-3/4"></Skeleton>
                <Skeleton className="h-4 bg-gray-300 w-1/4"></Skeleton>
            </Skeleton>
        </Skeleton>
    );
}
