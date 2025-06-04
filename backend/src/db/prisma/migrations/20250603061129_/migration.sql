/*
  Warnings:

  - You are about to drop the column `GoogleSheetId` on the `integrations` table. All the data in the column will be lost.
  - You are about to drop the column `NotionId` on the `integrations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `integrations` DROP COLUMN `GoogleSheetId`,
    DROP COLUMN `NotionId`;
