/*
  Warnings:

  - The primary key for the `TeacherOnSubjects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TeacherOnSubjects` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `UniGroup` table. All the data in the column will be lost.
  - You are about to drop the `Faculty` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `credits` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UniGroup" DROP CONSTRAINT "UniGroup_facultyId_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "credits" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "TeacherOnSubjects" DROP CONSTRAINT "TeacherOnSubjects_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "TeacherOnSubjects_pkey" PRIMARY KEY ("teacherId", "subjectId");

-- AlterTable
ALTER TABLE "UniGroup" DROP COLUMN "facultyId";

-- DropTable
DROP TABLE "Faculty";
