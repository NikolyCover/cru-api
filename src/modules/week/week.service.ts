import { Injectable } from '@nestjs/common'
import { Week } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class WeekService {
  constructor(private prisma: PrismaService) {}

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
      data,
    })
  }

  async findAll() {
    return this.prisma.week.findMany()
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
