/*
  Warnings:

  - You are about to drop the column `temporaryImageProductId` on the `TemporaryImage` table. All the data in the column will be lost.
  - You are about to drop the `TemporaryProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TemporaryImage" DROP CONSTRAINT "TemporaryImage_temporaryImageProductId_fkey";

-- AlterTable
ALTER TABLE "TemporaryImage" DROP COLUMN "temporaryImageProductId";

-- DropTable
DROP TABLE "TemporaryProduct";
