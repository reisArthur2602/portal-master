/*
  Warnings:

  - You are about to drop the column `doctor_name` on the `Exam` table. All the data in the column will be lost.
  - Added the required column `performedBy` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "doctor_name",
ADD COLUMN     "performedBy" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Attachment_examId_idx" ON "Attachment"("examId");

-- CreateIndex
CREATE INDEX "Exam_patientId_idx" ON "Exam"("patientId");

-- CreateIndex
CREATE INDEX "Exam_status_idx" ON "Exam"("status");

-- CreateIndex
CREATE INDEX "Exam_registry_idx" ON "Exam"("registry");

-- CreateIndex
CREATE INDEX "Invite_email_idx" ON "Invite"("email");

-- CreateIndex
CREATE INDEX "Patient_cpf_idx" ON "Patient"("cpf");

-- CreateIndex
CREATE INDEX "Patient_phone_idx" ON "Patient"("phone");

-- CreateIndex
CREATE INDEX "Patient_name_idx" ON "Patient"("name");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
