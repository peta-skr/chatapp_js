/*
  Warnings:

  - The primary key for the `Chat` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "Chat_pkey" PRIMARY KEY ("id");
