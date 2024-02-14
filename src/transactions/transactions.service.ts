import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionEntity } from './entities/transaction.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id: +userId },
      include: {
        transaction: true,
      },
    });

    if (!user) {
      throw new NotFoundException('O usuário não foi encontrado');
    }

    const userBalance = user.saldo;

    const userBalanceAfterTransaction =
      userBalance - createTransactionDto.valor;

    if (userBalanceAfterTransaction < user.limite) {
      throw new UnauthorizedException(
        'Saldo insuficiente para realizar a transação',
      );
    } else {
      await this.prisma.user.update({
        data: { saldo: userBalance - createTransactionDto.valor },
        where: { id: user.id },
      });

      const response = await this.prisma.transaction.create({
        data: {
          ...createTransactionDto,
          userId: user.id,
        },
      });

      return response;
    }
  }
}
