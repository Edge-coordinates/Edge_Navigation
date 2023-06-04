-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0;
