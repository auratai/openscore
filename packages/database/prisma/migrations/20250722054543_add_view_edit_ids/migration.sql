/*
  Warnings:

  - A unique constraint covering the columns `[viewId]` on the table `leaderboards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[editId]` on the table `leaderboards` will be added. If there are existing duplicate values, this will fail.
  - The required column `editId` was added to the `leaderboards` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `viewId` was added to the `leaderboards` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "leaderboards" ADD COLUMN     "editId" TEXT NOT NULL,
ADD COLUMN     "viewId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "leaderboards_viewId_key" ON "leaderboards"("viewId");

-- CreateIndex
CREATE UNIQUE INDEX "leaderboards_editId_key" ON "leaderboards"("editId");
