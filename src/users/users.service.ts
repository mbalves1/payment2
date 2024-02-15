import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { User, Prisma } from '@prisma/client';
import { UserResponse } from './response/UserResponse';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    let nextId = (await this.prisma.user.count()) + 1;

    while (nextId === 6) {
      nextId++;
    }

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        id: nextId,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: Prisma.UserWhereUniqueInput): Promise<UserResponse | null> {
    const user = await this.prisma.user.findUnique({
      where: id,
      include: {
        transaction: true,
      },
    });

    if (!user) {
      throw new NotFoundException('O usuário não foi encontrado');
    }

    const response: UserResponse = {
      saldo: {
        total: user.saldo,
        data_extrato: new Date(),
        limite: user.limite,
      },
      ultimas_transacoes: user.transaction,
    };

    return response;
  }
}
