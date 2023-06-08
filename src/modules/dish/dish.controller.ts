import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { DishService } from './dish.service'
import { Dish } from '@prisma/client'

@Controller('dishes')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post()
  create(@Body() data: Dish) {
    return this.dishService.create(data)
  }

  @Get()
  findAll() {
    return this.dishService.findAll()
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.dishService.find(+id)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Dish) {
    return this.dishService.update(+id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.dishService.delete(+id)
  }
}
