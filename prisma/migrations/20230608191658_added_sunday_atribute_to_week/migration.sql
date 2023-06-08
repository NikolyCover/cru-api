/*
  Warnings:

  - Added the required column `sunday` to the `Week` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Week` ADD COLUMN `sunday` DATETIME(3) NOT NULL;
