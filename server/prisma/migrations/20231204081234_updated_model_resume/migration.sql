/*
  Warnings:

  - You are about to drop the column `lang` on the `resumes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "resumes" DROP COLUMN "lang";

-- DropEnum
DROP TYPE "EnumLang";
