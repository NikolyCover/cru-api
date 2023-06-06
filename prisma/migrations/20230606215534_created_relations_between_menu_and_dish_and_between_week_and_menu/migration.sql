/*
  Warnings:

  - You are about to drop the column `menuId` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `weekId` on the `Menu` table. All the data in the column will be lost.
  - Added the required column `week_id` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Dish` DROP FOREIGN KEY `Dish_menuId_fkey`;

-- DropForeignKey
ALTER TABLE `Menu` DROP FOREIGN KEY `Menu_weekId_fkey`;

-- AlterTable
ALTER TABLE `Dish` DROP COLUMN `menuId`;

-- AlterTable
ALTER TABLE `Menu` DROP COLUMN `weekId`,
    ADD COLUMN `week_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `DishMenu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_dish` INTEGER NOT NULL,
    `id_Menu` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_week_id_fkey` FOREIGN KEY (`week_id`) REFERENCES `Week`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DishMenu` ADD CONSTRAINT `DishMenu_id_dish_fkey` FOREIGN KEY (`id_dish`) REFERENCES `Dish`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DishMenu` ADD CONSTRAINT `DishMenu_id_Menu_fkey` FOREIGN KEY (`id_Menu`) REFERENCES `Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
