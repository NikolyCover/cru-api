import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { Menu } from '@prisma/client'
import { DishService } from '../dish/dish.service'
import { organizeDishes } from 'src/utils/organizeDishes'

@Injectable()
export class MenuService {
  constructor(
    private prisma: PrismaService,
    private readonly dishService: DishService,
  ) {}

  async menuExists(date: Date) {
    const menuExists = await this.prisma.menu.findUnique({
      where: { date },
    })

    if (!menuExists) {
      return false
      //throw new Error('O cardápio não existe!')
    }
    return true
  }

  async create(date: Date, dishesIds: number[]) {
    const menu: Menu = await this.prisma.menu.create({
      data: {
        date,
      },
    })

    this.createDishMenus(menu.id, dishesIds)

    const dishes = await this.getDishesFromIds(dishesIds)

    return {
      id: menu.id,
      date: menu.date,
      dishes,
    }
  }

  async find(id: number) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
    })

    const menuWithDishes = await this.getMenuWithDishes(menu)

    return { ...menuWithDishes }
  }

  async findAll() {
    const menus = await this.prisma.menu.findMany()

    const menusWithDishes = menus.map((menu) => this.getMenuWithDishes(menu))

    return await Promise.all(menusWithDishes)
  }

  async findCurent() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const menu = await this.prisma.menu.findUnique({
      where: {
        date: today,
      },
    })

    const menuWithDishes = await this.getMenuWithDishes(menu)

    if (!menu) {
      return null
    }

    return { ...menuWithDishes }
  }

  async update(id: number, dishesIds: number[]) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
    })

    await this.deleteDishMenus(id)
    this.createDishMenus(id, dishesIds)
    const dishes = await this.getDishesFromIds(dishesIds)

    return {
      id,
      date: menu.date,
      dishes,
    }
  }

  async delete(id: number) {
    this.deleteDishMenus(id)
    return this.prisma.menu.delete({
      where: { id },
    })
  }

  async getMenuWithDishes(menu: Menu) {
    const dishMenus = await this.prisma.dishMenu.findMany({
      where: {
        id_Menu: menu.id,
      },
    })

    const dishesIds = dishMenus.map((dishMenu) => dishMenu.id_dish)

    const dishes = await this.getDishesFromIds(dishesIds)
    const organizedDishes = organizeDishes(dishes)

    return {
      id: menu.id,
      date: menu.date,
      organizedDishes,
    }
  }

  createDishMenus(menuId: number, dishesIds: number[]) {
    //verify if the dishesId are okay
    dishesIds.map(
      async (dishId) =>
        await this.prisma.dishMenu.create({
          data: {
            id_Menu: menuId,
            id_dish: dishId,
          },
        }),
    )
  }

  async getDishesFromIds(dishesIds: number[]) {
    const dishPromises = dishesIds.map(async (dishId) => {
      return await this.dishService.find(dishId)
    })

    return await Promise.all(dishPromises)
  }

  async deleteDishMenus(menuId: number) {
    return await this.prisma.dishMenu.deleteMany({
      where: { id_Menu: menuId },
    })
  }
}
