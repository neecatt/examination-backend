/*
  Warnings:

  - You are about to drop the column `userStatus` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `userStatus` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `is_active` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_studentId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teacherId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "userStatus";

-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "credit" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "subjectId",
DROP COLUMN "userStatus",
ADD COLUMN     "is_active" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "UserStatus";

-- CreateTable
CREATE TABLE "TeacherOnSubjects" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "TeacherOnSubjects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeacherOnSubjects" ADD CONSTRAINT "TeacherOnSubjects_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherOnSubjects" ADD CONSTRAINT "TeacherOnSubjects_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
