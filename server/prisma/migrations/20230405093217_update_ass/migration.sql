/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `CategoriesOnLinks` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `CategoriesOnLinks` table. All the data in the column will be lost.
  - You are about to drop the column `assignedAt` on the `CategoriesOnPosts` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `CategoriesOnPosts` table. All the data in the column will be lost.
  - You are about to drop the column `assignedAt` on the `TagsOnLinks` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `TagsOnLinks` table. All the data in the column will be lost.
  - You are about to drop the column `assignedAt` on the `TagsOnPosts` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `TagsOnPosts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CategoriesOnLinks" DROP COLUMN "assignedAt",
DROP COLUMN "assignedBy";

-- AlterTable
ALTER TABLE "CategoriesOnPosts" DROP COLUMN "assignedAt",
DROP COLUMN "assignedBy";

-- AlterTable
ALTER TABLE "TagsOnLinks" DROP COLUMN "assignedAt",
DROP COLUMN "assignedBy";

-- AlterTable
ALTER TABLE "TagsOnPosts" DROP COLUMN "assignedAt",
DROP COLUMN "assignedBy";
