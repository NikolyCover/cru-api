import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { WeekDay } from 'src/types/week-day'
import { addDays } from 'src/utils/add-days'
import { WeekService } from '../week/week.service'
import { Menu } from '@prisma/client'
import { DishService } from '../dish/dish.service'

@Injectable()
export class MenuService {
  constructor(
    private prisma: PrismaService,
    private readonly weekService: WeekService,
    private readonly dishService: DishService,
  ) {}

  async checkIfMenuExists(date: Date) {
    const menuExists = await this.prisma.menu.findUnique({
      where: { date },
    })

    if (!menuExists) {
      throw new Error('O cardápio não existe!')
    }
  }

  async create(weekId: number, weekDay: WeekDay, dishesIds: number[]) {
    //verify if already exists this weekDay at the week
    const week = await this.weekService.find(weekId)
    const date = addDays(week.sunday, weekDay)

    const menu: Menu = await this.prisma.menu.create({
      data: {
        date,
        week_id: weekId,
      },
    })

    this.createDishMenus(menu.id, dishesIds)

    const dishes = await this.getDishesFromIds(dishesIds)

    return {
      id: menu.id,
      date: menu.date,
      week,
      dishes,
    }
  }

  async find(date: Date) {
    this.checkIfMenuExists(date)

    const menu = await this.prisma.menu.findUnique({
      where: { date },
    })

    const week = await this.weekService.find(menu.week_id)

    // const dishPromises = (await this.prisma.dishMenu.findMany()).map(
    //   async (dishMenu) => {
    //     if (dishMenu.id_Menu == menu.id) {
    //       return await this.dishService.find(dishMenu.id_dish)
    //     }
    //   },
    // )

    const dishMenus = await this.prisma.dishMenu.findMany({
      where: {
        id_Menu: menu.id,
      },
    })

    const dishesIds = dishMenus.map((dishMenu) => dishMenu.id_dish)

    const dishes = await this.getDishesFromIds(dishesIds)

    return {
      id: menu.id,
      date: menu.date,
      week,
      dishes,
    }
  }

  async update(id: number, dishesIds: number[]) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
    })

    await this.deleteDishMenus(id)
    this.createDishMenus(id, dishesIds)
    const dishes = await this.getDishesFromIds(dishesIds)

    const week = await this.weekService.find(menu.week_id)

    return {
      id,
      date: menu.date,
      week,
      dishes,
    }
  }

  async delete(id: number) {
    this.deleteDishMenus(id)
    return this.prisma.menu.delete({
      where: { id },
    })
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
