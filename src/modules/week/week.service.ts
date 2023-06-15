import { Injectable } from '@nestjs/common'
import { Week } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import { MenuService } from '../menu/menu.service'

@Injectable()
export class WeekService {
  constructor(
    private prisma: PrismaService,
    private readonly menuService: MenuService,
  ) {}

  async checkIfWeekExists(id: number) {
    const weekExists = await this.prisma.week.findUnique({
      where: {
        id,
      },
    })

    if (!weekExists) {
      throw new Error('A semana não existe!')
    }
  }

  async create(data: Week) {
    return await this.prisma.week.create({
      data: {
        ...data,
        sunday: new Date(data.sunday),
      },
    })
  }

  async findAll() {
    return this.prisma.week.findMany()
  }

  async findCurent() {
    const today = new Date()
    const sunday = new Date(today.setDate(today.getDate() - today.getDay()))
    sunday.setHours(0, 0, 0, 0)

    const weeks = await this.findAll()

    const week = weeks.find((week) => week.sunday.getTime() == sunday.getTime())

    const menus = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(sunday)
      date.setDate(date.getDate() + i)
      menus.push(await this.menuService.find(date))
    }

    return {
      ...week,
      menus,
    }
  }

  async find(id: number) {
    this.checkIfWeekExists(id)

    return await this.prisma.week.findUnique({
      where: { id },
    })
  }

  async update(id: number, data: Week) {
    this.checkIfWeekExists(id)

    return await this.prisma.week.update({
      data,
      where: { id },
    })
  }

  async delete(id: number) {
    this.checkIfWeekExists(id)

    return await this.prisma.week.delete({
      where: { id },
    })
  }
}
