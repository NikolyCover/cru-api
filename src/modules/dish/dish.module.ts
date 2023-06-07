import { Module } from '@nestjs/common'
import { DishService } from './dish.service'
import { DishController } from './dish.controller'
import { PrismaService } from 'src/database/prisma.service'

@Module({
  controllers: [DishController],
  providers: [DishService, PrismaService],
})
export class DishModule {}
