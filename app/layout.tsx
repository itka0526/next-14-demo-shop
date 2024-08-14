import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Link from "next/link";
import { NavbarButtons } from "@/components/ui/navbarButtons";
import { CategorySidebar } from "@/components/category/category-sidebar";
import { CollapsibleSidebar } from "@/components/ui/collapsable-sidebar";
import Image from "next/image";
import logoIcon from "@/public/logo.svg";
import { Suspense } from "react";
import { PopularCategoriesSkeleton } from "@/components/skeletons/popular-categories-skeleton";
import { PopularCategories } from "@/components/category/popularCategory/popular-categories";
import NextTopLoader from "nextjs-toploader";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ourFileRouter } from "./api/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";
import { Logo } from "@/components/ui/logo";

export const revalidate = 60;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        template: "%s | 𝕆𝕍𝔾𝕆",
        default: "Нүүр | 𝕆𝕍𝔾𝕆",
    },
    description: "Энэ бол NextJS 14 дээр бүтээгдсэн демо цахим худалдааны вэбсайт юм.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body id="body" className={inter.className}>
                <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
                <Toaster position="bottom-right" />
                <NextTopLoader showSpinner={false} color="#202020" shadow="0 0 10px #2299DD,0 0 5px #2299DD" />
                <div className="drawer">
                    <CollapsibleSidebar />
                    <div className="drawer-content flex flex-col">
                        {/* Navbar */}
                        <nav className="navbar bg-base-300 w-full">
                            <div className="w-full h-full flex flex-col">
                                <div className="flex w-full h-full items-center">
                                    <div className="mx-2 flex-1 px-2">
                                        <Link href="/">
                                            <Logo />
                                        </Link>
                                    </div>
                                    <div className="hidden flex-none lg:block">
                                        <ul className="menu menu-horizontal space-x-2">
                                            <NavbarButtons />
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex w-full h-full items-center space-x-2">
                                    <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-ghost flex">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            className="inline-block h-6 w-6 stroke-current"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                        </svg>
                                        <span>Ангилал</span>
                                    </label>
                                    <div className="gap-4 hidden md:flex">
                                        <Suspense fallback={<PopularCategoriesSkeleton />}>
                                            <PopularCategories defaultStyles="px-4 py-2 rounded-lg" />
                                        </Suspense>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <main className="flex min-h-screen flex-col items-center justify-between px-8 md:px-16">{children}</main>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 min-h-full w-80 p-4">
                            {/* Sidebar content here */}
                            <CategorySidebar />
                        </ul>
                    </div>
                </div>
                <footer className="footer footer-center bg-base-300 text-base-content p-4">
                    <aside>
                        <p>Copyright © {new Date().getFullYear()}</p>
                    </aside>
                </footer>
            </body>
        </html>
    );
}
