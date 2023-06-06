/*
  Warnings:

  - The primary key for the `Dish` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Dish` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The values [SIDE_DISHES] on the enum `Dish_category` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `menu` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Dish` DROP PRIMARY KEY,
    ADD COLUMN `menuId` INTEGER NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `category` ENUM('PROTEIN', 'SIDE_DISHE', 'SALAD', 'DESSERT', 'DRINK') NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `menu`;

-- CreateTable
CREATE TABLE `Menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `weekId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Week` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Dish` ADD CONSTRAINT `Dish_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_weekId_fkey` FOREIGN KEY (`weekId`) REFERENCES `Week`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
