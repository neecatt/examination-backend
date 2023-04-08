/*
  Warnings:

  - You are about to drop the column `OptionA` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `OptionB` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `OptionC` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `OptionD` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `OptionE` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `answer` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `unigroupId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubjectOnUnigroups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherOnSubjects` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `groupId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_unigroupId_fkey";

-- DropForeignKey
ALTER TABLE "SubjectOnUnigroups" DROP CONSTRAINT "SubjectOnUnigroups_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "SubjectOnUnigroups" DROP CONSTRAINT "SubjectOnUnigroups_unigroupId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherOnSubjects" DROP CONSTRAINT "TeacherOnSubjects_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherOnSubjects" DROP CONSTRAINT "TeacherOnSubjects_teacherId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "OptionA",
DROP COLUMN "OptionB",
DROP COLUMN "OptionC",
DROP COLUMN "OptionD",
DROP COLUMN "OptionE",
DROP COLUMN "answer",
ADD COLUMN     "fileurl" TEXT,
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "unigroupId";

-- DropTable
DROP TABLE "Answer";

-- DropTable
DROP TABLE "SubjectOnUnigroups";

-- DropTable
DROP TABLE "TeacherOnSubjects";

-- CreateTable
CREATE TABLE "Option" (
    "id" SERIAL NOT NULL,
    "option" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TeacherToUniGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SubjectToTeacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SubjectToUniGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TeacherToUniGroup_AB_unique" ON "_TeacherToUniGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_TeacherToUniGroup_B_index" ON "_TeacherToUniGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SubjectToTeacher_AB_unique" ON "_SubjectToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_SubjectToTeacher_B_index" ON "_SubjectToTeacher"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SubjectToUniGroup_AB_unique" ON "_SubjectToUniGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_SubjectToUniGroup_B_index" ON "_SubjectToUniGroup"("B");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "UniGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherToUniGroup" ADD CONSTRAINT "_TeacherToUniGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherToUniGroup" ADD CONSTRAINT "_TeacherToUniGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "UniGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToTeacher" ADD CONSTRAINT "_SubjectToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToTeacher" ADD CONSTRAINT "_SubjectToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToUniGroup" ADD CONSTRAINT "_SubjectToUniGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToUniGroup" ADD CONSTRAINT "_SubjectToUniGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "UniGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
