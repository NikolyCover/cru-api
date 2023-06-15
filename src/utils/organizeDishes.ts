import { Category, Dish } from '@prisma/client'
import { OrganizedDishes } from 'src/interfaces/organized-dishes'

export const organizeDishes = (dishes: Dish[]) => {
  const organizedDishes: OrganizedDishes[] = []

  // Group dishes by category
  const dishMap = dishes.reduce((map, dish) => {
    if (!map[dish.category]) {
      map[dish.category] = []
    }
    map[dish.category].push(dish)
    return map
  }, {} as { [key in Category]: Dish[] })

  // Create OrganizedDish objects
  for (const category of Object.keys(dishMap)) {
    const organizedDish: OrganizedDishes = {
      category: category as Category,
      dishes: dishMap[category as Category],
    }
    organizedDishes.push(organizedDish)
  }

  return organizedDishes
}
