-- CreateEnum
CREATE TYPE "ContentFetchingStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "ContentFetching" (
    "id" TEXT NOT NULL,
    "status" "ContentFetchingStatus" NOT NULL,
    "userId" TEXT NOT NULL,
    "platform" "PlatformEnum" NOT NULL,

    CONSTRAINT "ContentFetching_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "externalCreatedAt" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB NOT NULL,
    "title" TEXT NOT NULL,
    "platform" "PlatformEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContentFetching" ADD CONSTRAINT "ContentFetching_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
