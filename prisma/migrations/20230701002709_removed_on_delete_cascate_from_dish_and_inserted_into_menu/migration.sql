-- DropForeignKey
ALTER TABLE `DishMenu` DROP FOREIGN KEY `DishMenu_id_Menu_fkey`;

-- DropForeignKey
ALTER TABLE `DishMenu` DROP FOREIGN KEY `DishMenu_id_dish_fkey`;

-- AddForeignKey
ALTER TABLE `DishMenu` ADD CONSTRAINT `DishMenu_id_dish_fkey` FOREIGN KEY (`id_dish`) REFERENCES `Dish`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DishMenu` ADD CONSTRAINT `DishMenu_id_Menu_fkey` FOREIGN KEY (`id_Menu`) REFERENCES `Menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
