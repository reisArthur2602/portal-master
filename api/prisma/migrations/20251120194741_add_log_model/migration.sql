/*
  Warnings:

  - A unique constraint covering the columns `[orthanc_study_id]` on the table `Exam` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "SystemEvent" AS ENUM ('PatientCreated', 'PatientRemoved', 'ExamCreated', 'ExamReady', 'ExamDelivered', 'ExamPickup', 'ExamRemoved');

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "event" "SystemEvent" NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Log_event_idx" ON "Log"("event");

-- CreateIndex
CREATE INDEX "Log_createdAt_idx" ON "Log"("createdAt");

-- CreateIndex
CREATE INDEX "Log_userId_idx" ON "Log"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Exam_orthanc_study_id_key" ON "Exam"("orthanc_study_id");

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
