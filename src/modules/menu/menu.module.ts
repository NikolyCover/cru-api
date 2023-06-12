import { Module } from '@nestjs/common'
import { MenuService } from './menu.service'
import { MenuController } from './menu.controller'
import { PrismaService } from 'src/database/prisma.service'
import { DishService } from '../dish/dish.service'

@Module({
  controllers: [MenuController],
  providers: [MenuService, PrismaService, DishService],
})
export class MenuModule {}
