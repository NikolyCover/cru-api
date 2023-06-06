import { Controller, Get } from '@nestjs/common'
import { PrismaService } from './database/prisma.service'

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getHello() {
    const dish = await this.prisma.dish.create({
      data: {
        name: 'Arroz',
        description: 'Arroz branco cozido',
        contains_meat: false,
        contains_milk: false,
      },
    })

    return {
      dish,
    }
  }
}
