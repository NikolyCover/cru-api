-- CreateTable
CREATE TABLE "Dish" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contains_milk" BOOLEAN NOT NULL,
    "contains_meat" BOOLEAN NOT NULL
);
