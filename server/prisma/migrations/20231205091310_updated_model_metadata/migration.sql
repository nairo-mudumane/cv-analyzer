/*
  Warnings:

  - You are about to drop the column `rowData` on the `resume_metadata` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "resume_metadata" DROP COLUMN "rowData",
ADD COLUMN     "rawInfo" TEXT;
