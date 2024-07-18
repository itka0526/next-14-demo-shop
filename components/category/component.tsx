import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Component() {
    return (
        <div className="flex items-center space-x-4 p-4">
            <Button variant="outline" className="flex items-center space-x-2">
                <MenuIcon />
                <span>Ангилал</span>
            </Button>
            <nav className="flex space-x-4">
                <Link href="#" className="text-muted-foreground underline" prefetch={false}>
                    Брэндүүд
                </Link>
                <Link href="#" className="text-muted-foreground underline" prefetch={false}>
                    Бэлгийн багц
                </Link>
                <Link href="#" className="text-muted-foreground underline" prefetch={false}>
                    Зээлийн заавар
                </Link>
            </nav>
        </div>
    );
}

function MenuIcon() {
    return (
        <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
}
