/*
  Warnings:

  - The primary key for the `Dish` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DishMenu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Week` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `DishMenu` DROP FOREIGN KEY `DishMenu_id_Menu_fkey`;

-- DropForeignKey
ALTER TABLE `DishMenu` DROP FOREIGN KEY `DishMenu_id_dish_fkey`;

-- DropForeignKey
ALTER TABLE `Menu` DROP FOREIGN KEY `Menu_week_id_fkey`;

-- AlterTable
ALTER TABLE `Dish` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `DishMenu` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `id_dish` VARCHAR(191) NOT NULL,
    MODIFY `id_Menu` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Menu` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `week_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Week` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_week_id_fkey` FOREIGN KEY (`week_id`) REFERENCES `Week`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DishMenu` ADD CONSTRAINT `DishMenu_id_dish_fkey` FOREIGN KEY (`id_dish`) REFERENCES `Dish`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DishMenu` ADD CONSTRAINT `DishMenu_id_Menu_fkey` FOREIGN KEY (`id_Menu`) REFERENCES `Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
