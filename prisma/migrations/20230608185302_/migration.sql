/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Menu_date_key` ON `Menu`(`date`);
