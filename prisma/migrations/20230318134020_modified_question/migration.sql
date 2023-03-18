/*
  Warnings:

  - You are about to drop the column `answer` on the `Question` table. All the data in the column will be lost.
  - You are about to alter the column `credit` on the `Subject` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - A unique constraint covering the columns `[questionId]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "answer",
ADD COLUMN     "OptionA" TEXT,
ADD COLUMN     "OptionB" TEXT,
ADD COLUMN     "OptionC" TEXT,
ADD COLUMN     "OptionD" TEXT,
ADD COLUMN     "OptionE" TEXT,
ADD COLUMN     "answerId" INTEGER;

-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "credit" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Answer_questionId_key" ON "Answer"("questionId");
