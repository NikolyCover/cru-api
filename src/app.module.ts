import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaService } from './database/prisma.service'
import { DishModule } from './modules/dish/dish.module'

@Module({
  imports: [DishModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
