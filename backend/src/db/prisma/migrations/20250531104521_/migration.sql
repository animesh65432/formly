/*
  Warnings:

  - You are about to alter the column `type` on the `integrations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `integrations` MODIFY `type` ENUM('GOOGLE_SHEETS', 'NOTION') NOT NULL;
