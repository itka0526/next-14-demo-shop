import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 md:px-0 md:py-24 w-full">
            <div className="grid gap-6">
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-5 md:col-span-4 rounded-lg overflow-hidden">
                        <Skeleton className="w-full h-[400px] rounded-lg" />
                    </div>
                    <div className="col-span-5 md:col-span-1 grid gap-4">
                        <Skeleton className="w-full h-[100px] rounded-lg" />
                        <Skeleton className="w-full h-[100px] rounded-lg" />
                        <Skeleton className="w-full h-[100px] rounded-lg" />
                    </div>
                </div>
            </div>
            <div className="grid gap-6">
                <div>
                    <Skeleton className="h-8 w-[300px]" />
                    <Skeleton className="h-6 w-[400px] mt-2" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <Skeleton className="w-5 h-5 rounded-full" />
                        <Skeleton className="w-5 h-5 rounded-full" />
                        <Skeleton className="w-5 h-5 rounded-full" />
                        <Skeleton className="w-5 h-5 rounded-full" />
                        <Skeleton className="w-5 h-5 rounded-full" />
                    </div>
                    <Skeleton className="h-5 w-[50px]" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-[100px] rounded-md" />
                </div>
                <Skeleton className="h-10 w-[100px]" />
                <div>
                    <Skeleton className="h-12 w-full rounded-md" />
                </div>
                <div className="grid gap-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        </div>
    );
}
