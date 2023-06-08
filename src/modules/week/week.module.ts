import { Module } from '@nestjs/common'
import { WeekService } from './week.service'
import { WeekController } from './week.controller'
import { PrismaService } from 'src/database/prisma.service'

@Module({
  controllers: [WeekController],
  providers: [WeekService, PrismaService],
})
export class WeekModule {}
