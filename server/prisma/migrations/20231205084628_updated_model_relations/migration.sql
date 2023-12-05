/*
  Warnings:

  - You are about to drop the column `resumeId` on the `resume_metadata` table. All the data in the column will be lost.
  - Added the required column `metadataId` to the `resumes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "resume_metadata" DROP CONSTRAINT "resume_metadata_resumeId_fkey";

-- AlterTable
ALTER TABLE "resume_metadata" DROP COLUMN "resumeId";

-- AlterTable
ALTER TABLE "resumes" ADD COLUMN     "metadataId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "resume_metadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
