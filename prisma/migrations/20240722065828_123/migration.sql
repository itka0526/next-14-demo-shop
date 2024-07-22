-- CreateTable
CREATE TABLE "Thumnail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imageUrl" TEXT NOT NULL DEFAULT '/placeholder.svg',
    "productId" INTEGER,
    CONSTRAINT "Thumnail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
