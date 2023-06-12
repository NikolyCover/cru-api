import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { WeekService } from './week.service'
import { Week } from '@prisma/client'

@Controller('weeks')
export class WeekController {
  constructor(private readonly weekService: WeekService) {}

  @Post()
  create(@Body() data: Week) {
    return this.weekService.create(data)
  }

  @Get()
  findAll() {
    return this.weekService.findAll()
  }

  @Get('current')
  findCurrent() {
    return this.weekService.findCurent()
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.weekService.find(+id)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Week) {
    return this.weekService.update(+id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.weekService.delete(+id)
  }
}
