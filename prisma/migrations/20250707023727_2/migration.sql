/*
  Warnings:

  - You are about to drop the column `groupId` on the `conversations` table. All the data in the column will be lost.
  - Added the required column `group_id` to the `conversations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "conversations" DROP CONSTRAINT "conversations_groupId_fkey";

-- AlterTable
ALTER TABLE "conversations" DROP COLUMN "groupId",
ADD COLUMN     "group_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
