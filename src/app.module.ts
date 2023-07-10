import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaService } from './database/prisma.service'
import { DishModule } from './modules/dish/dish.module'
import { MenuModule } from './modules/menu/menu.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [DishModule, MenuModule, UserModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
