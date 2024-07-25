"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

type PopularCategoryProps = {
    readonly id: number;
    readonly categoryDisplayName: string;
    readonly categoryName: string;
    readonly defaultStyles: string;
};

export function PopularCategory({ id, categoryDisplayName, categoryName, defaultStyles }: PopularCategoryProps) {
    const { categoryName: urlCategoryName } = useParams();
    const activeUrlStyles = "bg-secondary transition-all";
    return (
        <Link
            key={`${categoryName}-${id}`}
            href={`/products/${categoryName}`}
            className={cn(defaultStyles, urlCategoryName === categoryName ? activeUrlStyles : "")}
            prefetch={false}
        >
            <span className="text-sm font-medium">{categoryDisplayName}</span>
        </Link>
    );
}
