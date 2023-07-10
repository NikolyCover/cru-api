import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async auth(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)
    }

    const passwordsMatch = user.password == password

    if (!passwordsMatch) {
      throw new HttpException('Senha incorreta!', HttpStatus.FORBIDDEN)
    }

    return user
  }
}
