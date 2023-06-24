/*
  Warnings:

  - You are about to drop the column `week_id` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the `Week` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Menu` DROP FOREIGN KEY `Menu_week_id_fkey`;

-- AlterTable
ALTER TABLE `Menu` DROP COLUMN `week_id`;

-- DropTable
DROP TABLE `Week`;
