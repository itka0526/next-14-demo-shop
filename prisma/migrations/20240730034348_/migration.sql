/*
  Warnings:

  - You are about to drop the column `thumbnail_1` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail_2` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail_3` on the `Product` table. All the data in the column will be lost.
  - The `imageUrl` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "thumbnail_1",
DROP COLUMN "thumbnail_2",
DROP COLUMN "thumbnail_3",
DROP COLUMN "imageUrl",
ADD COLUMN     "imageUrl" TEXT[];
