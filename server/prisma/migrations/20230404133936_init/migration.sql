/*
  Warnings:

  - You are about to drop the column `fatherId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_fatherId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "fatherId",
ADD COLUMN     "path" TEXT,
ALTER COLUMN "summary" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "summary" TEXT;

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "summary" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "summary" TEXT,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnLinks" (
    "linkId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "CategoriesOnLinks_pkey" PRIMARY KEY ("linkId","categoryId")
);

-- CreateTable
CREATE TABLE "TagsOnLinks" (
    "linkId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "TagsOnLinks_pkey" PRIMARY KEY ("linkId","tagId")
);

-- AddForeignKey
ALTER TABLE "CategoriesOnLinks" ADD CONSTRAINT "CategoriesOnLinks_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnLinks" ADD CONSTRAINT "CategoriesOnLinks_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnLinks" ADD CONSTRAINT "TagsOnLinks_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnLinks" ADD CONSTRAINT "TagsOnLinks_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
