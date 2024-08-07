-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(16) NOT NULL,
    "name" VARCHAR(32) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" VARCHAR(16) NOT NULL,
    "user_name" VARCHAR(32) NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_user_name_key" ON "Chat"("user_name");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_user_name_fkey" FOREIGN KEY ("user_name") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
