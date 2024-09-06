-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "password" VARCHAR(64) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" VARCHAR(36) NOT NULL,
    "user_name" VARCHAR(32) NOT NULL,
    "channel_id" VARCHAR(36) NOT NULL,
    "text" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" VARCHAR(36) NOT NULL,
    "channel_name" VARCHAR(64) NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Join_Channel" (
    "channel_id" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(36) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_Join_Channel_channel_id_user_id_key" ON "User_Join_Channel"("channel_id", "user_id");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_user_name_fkey" FOREIGN KEY ("user_name") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Join_Channel" ADD CONSTRAINT "User_Join_Channel_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Join_Channel" ADD CONSTRAINT "User_Join_Channel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
