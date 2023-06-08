import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { MenuService } from './menu.service'
import { Menu } from '@prisma/client'
import { WeekDay } from 'src/types/week-day'

type MenuParamns = {
  week_id: number
  week_day: WeekDay
  dishes_ids: []
}

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() data: MenuParamns) {
    return this.menuService.create(data.week_id, data.week_day, data.dishes_ids)
  }

  // @Get(':id')
  // find(@Param('id') id: number) {
  //   return this.menuService.find(+id)
  // }

  // @Put(':id')
  // update(@Param('id') id: number, @Body() data: Menu) {
  //   return this.menuService.update(+id, data)
  // }

  // @Delete(':id')
  // delete(@Param('id') id: string) {
  //   return this.menuService.delete(+id)
  // }
}
