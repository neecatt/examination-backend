/*
  Warnings:

  - You are about to drop the column `questionId` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `answerId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `uniGroupId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `credits` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `uniGroupId` on the `Subject` table. All the data in the column will be lost.
  - Added the required column `unigroupId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `surname` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_uniGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_uniGroupId_fkey";

-- DropIndex
DROP INDEX "Answer_questionId_key";

-- DropIndex
DROP INDEX "Student_email_key";

-- DropIndex
DROP INDEX "Student_username_key";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "questionId";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "answerId",
ADD COLUMN     "answer" TEXT;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "uniGroupId",
DROP COLUMN "username",
ADD COLUMN     "unigroupId" INTEGER NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "surname" SET NOT NULL;

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "credits",
DROP COLUMN "uniGroupId";

-- CreateTable
CREATE TABLE "SubjectOnUnigroups" (
    "subjectId" INTEGER NOT NULL,
    "unigroupId" INTEGER NOT NULL,

    CONSTRAINT "SubjectOnUnigroups_pkey" PRIMARY KEY ("subjectId","unigroupId")
);

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_unigroupId_fkey" FOREIGN KEY ("unigroupId") REFERENCES "UniGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectOnUnigroups" ADD CONSTRAINT "SubjectOnUnigroups_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectOnUnigroups" ADD CONSTRAINT "SubjectOnUnigroups_unigroupId_fkey" FOREIGN KEY ("unigroupId") REFERENCES "UniGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
