/*
  Warnings:

  - You are about to drop the column `skills` on the `resumes` table. All the data in the column will be lost.
  - Added the required column `token` to the `resumes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnumLang" AS ENUM ('PT', 'EN');

-- AlterTable
ALTER TABLE "resumes" DROP COLUMN "skills",
ADD COLUMN     "lang" "EnumLang" NOT NULL DEFAULT 'EN',
ADD COLUMN     "token" TEXT NOT NULL;
