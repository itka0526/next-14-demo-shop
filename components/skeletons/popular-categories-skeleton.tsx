import { Skeleton } from "../ui/skeleton";

export function PopularCategoriesSkeleton() {
    return (
        <>
            <Skeleton className="group flex flex-col items-center justify-center space-y-2 rounded-lg bg-background p-4 transition-all hover:bg-accent hover:text-accent-foreground" />
            <Skeleton className="group flex flex-col items-center justify-center space-y-2 rounded-lg bg-background p-4 transition-all hover:bg-accent hover:text-accent-foreground" />
            <Skeleton className="group flex flex-col items-center justify-center space-y-2 rounded-lg bg-background p-4 transition-all hover:bg-accent hover:text-accent-foreground" />
        </>
    );
}
