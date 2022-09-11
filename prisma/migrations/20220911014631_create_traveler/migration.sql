-- CreateTable
CREATE TABLE "travelers" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "travelers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "travelers_username_key" ON "travelers"("username");

-- CreateIndex
CREATE UNIQUE INDEX "travelers_email_key" ON "travelers"("email");
