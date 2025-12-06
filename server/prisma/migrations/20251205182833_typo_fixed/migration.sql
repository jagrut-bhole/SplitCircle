/*
  Warnings:

  - You are about to drop the column `spliType` on the `Expense` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "spliType",
ADD COLUMN     "splitType" "SplitType" NOT NULL DEFAULT 'EQUAL';
