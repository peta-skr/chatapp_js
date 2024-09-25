/*
  Warnings:

  - You are about to drop the column `user_name` on the `Chat` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_user_name_fkey";

-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "user_name",
ADD COLUMN     "user_id" VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
