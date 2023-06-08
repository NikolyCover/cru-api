import { Injectable } from '@nestjs/common'
import { Dish } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class DishService {
  constructor(private prisma: PrismaService) {}

  async checkIfDishExists(id: number) {
    const dishExists = await this.prisma.dish.findUnique({
      where: {
        id,
      },
    })

    if (!dishExists) {
      throw new Error('O prato não existe!')
    }
  }

  async create(data: Dish) {
    const dishExists = await this.prisma.dish.findFirst({
      where: {
        name: data.name,
      },
    })

    if (dishExists) {
      throw new Error('Já existe um prato cadastrado com esse nome')
    }

    const dish = await this.prisma.dish.create({
      data,
    })
    return dish
  }

  async findAll() {
    return this.prisma.dish.findMany()
  }

  async find(id: number) {
    this.checkIfDishExists(id)

    return await this.prisma.dish.findUnique({
      where: { id },
    })
  }

  async update(id: number, data: Dish) {
    this.checkIfDishExists(id)

    return await this.prisma.dish.update({
      data,
      where: { id },
    })
  }

  async delete(id: number) {
    this.checkIfDishExists(id)

    return await this.prisma.dish.delete({
      where: { id },
    })
  }
}
