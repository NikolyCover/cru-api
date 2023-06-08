import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaService } from './database/prisma.service'
import { DishModule } from './modules/dish/dish.module'
import { MenuModule } from './modules/menu/menu.module';
import { WeekModule } from './modules/week/week.module';

@Module({
  imports: [DishModule, MenuModule, WeekModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
