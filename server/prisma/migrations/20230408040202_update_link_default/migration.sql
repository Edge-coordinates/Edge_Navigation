/*
  Warnings:

  - Made the column `forlink` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "forlink" SET NOT NULL,
ALTER COLUMN "forlink" SET DEFAULT 0;
