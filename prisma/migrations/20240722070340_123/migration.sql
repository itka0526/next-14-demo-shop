/*
  Warnings:

  - You are about to drop the `Thumbnail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Thumbnail";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subCategoryId" INTEGER NOT NULL,
    "productDisplayName" TEXT NOT NULL DEFAULT '',
    "productName" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT NOT NULL DEFAULT '/placeholder.svg',
    "thumbnail_1" TEXT NOT NULL DEFAULT '/placeholder.svg',
    "thumbnail_2" TEXT NOT NULL DEFAULT '/placeholder.svg',
    "thumbnail_3" TEXT NOT NULL DEFAULT '/placeholder.svg',
    "price" INTEGER NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Product_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("description", "featured", "id", "imageUrl", "price", "productDisplayName", "productName", "subCategoryId") SELECT "description", "featured", "id", "imageUrl", "price", "productDisplayName", "productName", "subCategoryId" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_productName_key" ON "Product"("productName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
