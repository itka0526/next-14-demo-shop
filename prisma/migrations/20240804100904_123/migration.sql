/*
  Warnings:

  - Made the column `productId` on table `Image` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productId_fkey";

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "productId" SET NOT NULL;

-- CreateTable
CREATE TABLE "TemporaryProduct" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER,

    CONSTRAINT "TemporaryProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemporaryImage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "temporaryImageProductId" INTEGER,

    CONSTRAINT "TemporaryImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemporaryImage" ADD CONSTRAINT "TemporaryImage_temporaryImageProductId_fkey" FOREIGN KEY ("temporaryImageProductId") REFERENCES "TemporaryProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;
