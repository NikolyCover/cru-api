import { Injectable } from '@nestjs/common'
import { Menu } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async checkIfMenuExists(id: number) {
    const menuExists = await this.prisma.menu.findUnique({
      where: {
        id,
      },
    })

    if (!menuExists) {
      throw new Error('O menu não existe!')
    }
  }

  async create(data: Menu) {
    const menuExists = await this.prisma.menu.findFirst({
      where: {
        date: data.date,
      },
    })

    if (menuExists) {
      throw new Error('Já existe um cardárpio cadastrado para esse dia')
    }

    return await this.prisma.menu.create({
      data,
    })
  }
}
