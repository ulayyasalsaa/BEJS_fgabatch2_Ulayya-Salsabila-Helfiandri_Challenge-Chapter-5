-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "identityType" TEXT NOT NULL,
    "identityNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userID_key" ON "Profile"("userID");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
