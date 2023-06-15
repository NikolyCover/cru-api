import { Category, Dish } from '@prisma/client'

export interface OrganizedDishes {
  category: Category
  dishes: Dish[]
}
