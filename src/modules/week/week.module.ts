import { Module } from '@nestjs/common'
import { WeekService } from './week.service'
import { WeekController } from './week.controller'
import { PrismaService } from 'src/database/prisma.service'
import { MenuService } from '../menu/menu.service'
import { DishService } from '../dish/dish.service'

@Module({
  controllers: [WeekController],
  providers: [WeekService, PrismaService, DishService, MenuService],
})
export class WeekModule {}
