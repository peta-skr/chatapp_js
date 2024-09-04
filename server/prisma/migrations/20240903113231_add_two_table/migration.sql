/*
  Warnings:

  - Added the required column `channel_id` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "channel_id" VARCHAR(36) NOT NULL;

-- CreateTable
CREATE TABLE "Channel" (
    "id" VARCHAR(36) NOT NULL,
    "channel_name" VARCHAR(64) NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Join_Channel" (
    "channel_id" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(32) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Join_Channel_channel_id_user_id_key" ON "User_Join_Channel"("channel_id", "user_id");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Join_Channel" ADD CONSTRAINT "User_Join_Channel_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Join_Channel" ADD CONSTRAINT "User_Join_Channel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
