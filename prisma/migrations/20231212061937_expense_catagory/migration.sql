/*
  Warnings:

  - Added the required column `amount` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `catagoryId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "catagoryId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
