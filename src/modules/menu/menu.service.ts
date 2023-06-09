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

    //verify if the dishesId are okay
    const dishes = dishesIds.map(async (dishId) => {
      return await this.dishService.find(dishId)
    })

    dishesIds.map(
      async (dishId) =>
        await this.prisma.dishMenu.create({
          data: {
            id_Menu: menu.id,
            id_dish: dishId,
          },
        }),
    )

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

    const dishPromises = (await this.prisma.dishMenu.findMany()).map(
      async (dishMenu) => {
        if (dishMenu.id_Menu == menu.id) {
          return await this.dishService.find(dishMenu.id_dish)
        }
      },
    )

    const dishes = await Promise.all(dishPromises)

    return {
      id: menu.id,
      date: menu.date,
      week,
      dishes,
    }
  }
}
