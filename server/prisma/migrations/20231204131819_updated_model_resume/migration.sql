/*
  Warnings:

  - You are about to drop the column `metadataId` on the `resumes` table. All the data in the column will be lost.
  - Added the required column `education` to the `resume_metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `resume_metadata` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "resumes" DROP CONSTRAINT "resumes_metadataId_fkey";

-- AlterTable
ALTER TABLE "resume_metadata" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "education" TEXT NOT NULL,
ADD COLUMN     "experience" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "headline" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "other" TEXT,
ADD COLUMN     "resumeId" TEXT;

-- AlterTable
ALTER TABLE "resumes" DROP COLUMN "metadataId";

-- AddForeignKey
ALTER TABLE "resume_metadata" ADD CONSTRAINT "resume_metadata_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resumes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
