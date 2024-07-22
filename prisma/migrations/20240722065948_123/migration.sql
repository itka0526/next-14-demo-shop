/*
  Warnings:

  - You are about to drop the `Thumnail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Thumnail";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Thumbnail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imageUrl" TEXT NOT NULL DEFAULT '/placeholder.svg',
    "productId" INTEGER,
    CONSTRAINT "Thumbnail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
