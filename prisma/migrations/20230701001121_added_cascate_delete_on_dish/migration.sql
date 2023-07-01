-- DropForeignKey
ALTER TABLE `DishMenu` DROP FOREIGN KEY `DishMenu_id_dish_fkey`;

-- AddForeignKey
ALTER TABLE `DishMenu` ADD CONSTRAINT `DishMenu_id_dish_fkey` FOREIGN KEY (`id_dish`) REFERENCES `Dish`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
