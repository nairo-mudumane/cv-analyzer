/*
  Warnings:

  - The `lang` column on the `resume_metadata` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "resume_metadata" DROP COLUMN "lang",
ADD COLUMN     "lang" TEXT;

-- DropEnum
DROP TYPE "EnumMetadataLang";
