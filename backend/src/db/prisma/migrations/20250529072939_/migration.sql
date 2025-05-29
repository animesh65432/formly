/*
  Warnings:

  - You are about to drop the column `createdAt` on the `FormBlock` table. All the data in the column will be lost.
  - Added the required column `position` to the `FormBlock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FormBlock` DROP COLUMN `createdAt`,
    ADD COLUMN `position` INTEGER NOT NULL;
