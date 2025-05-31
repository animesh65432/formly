/*
  Warnings:

  - You are about to drop the column `GoogleSheetsurl` on the `integrations` table. All the data in the column will be lost.
  - You are about to drop the column `Notionurl` on the `integrations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `integrations` DROP COLUMN `GoogleSheetsurl`,
    DROP COLUMN `Notionurl`,
    ADD COLUMN `GoogleSheetId` VARCHAR(191) NULL,
    ADD COLUMN `NotionId` VARCHAR(191) NULL;
