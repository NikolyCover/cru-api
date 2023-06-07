/*
  Warnings:

  - The values [SIDE_DISHE] on the enum `Dish_category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Dish` MODIFY `category` ENUM('PROTEIN', 'SIDE_DISH', 'SALAD', 'DESSERT', 'DRINK') NOT NULL;
