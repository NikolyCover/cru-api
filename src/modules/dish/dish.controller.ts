import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { DishService } from './dish.service'
import { Dish } from '@prisma/client'

@Controller('dishes')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post()
  async create(@Body() data: Dish) {
    return this.dishService.create(data)
  }

  @Get()
  async findAll() {
    return this.dishService.findAll()
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Dish) {
    return this.dishService.update(id, data)
  }
}
