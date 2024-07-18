/*
  Warnings:

  - You are about to alter the column `phone` on the `candidates` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(11)`.

*/
-- DropIndex
DROP INDEX "candidates_email_key";

-- AlterTable
ALTER TABLE "candidates" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(11);
