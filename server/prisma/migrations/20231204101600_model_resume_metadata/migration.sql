-- CreateEnum
CREATE TYPE "EnumMetadataLang" AS ENUM ('PT', 'EN');

-- AlterTable
ALTER TABLE "resumes" ADD COLUMN     "metadataId" TEXT;

-- CreateTable
CREATE TABLE "resume_metadata" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lang" "EnumMetadataLang" NOT NULL DEFAULT 'EN',
    "skills" TEXT[],

    CONSTRAINT "resume_metadata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "resume_metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;
