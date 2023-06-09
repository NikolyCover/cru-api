import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { MenuService } from './menu.service'

type MenuParamns = {
  date: Date
  dishes_ids: []
}

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() data: MenuParamns) {
    return this.menuService.create(data.date, data.dishes_ids)
  }

  @Get('current')
  findCurrent() {
    return this.menuService.findCurent()
  }

  @Get()
  findAll() {
    return this.menuService.findAll()
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.menuService.find(Number(id))
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: MenuParamns) {
    return this.menuService.update(+id, data.dishes_ids)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.menuService.delete(+id)
  }
}
