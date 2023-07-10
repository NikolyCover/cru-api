import { Body, Controller, Post } from '@nestjs/common'
import { UserService } from './user.service'

type UserParamns = {
  username: string
  password: string
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  auth(@Body() data: UserParamns) {
    return this.userService.auth(data.username, data.password)
  }
}
