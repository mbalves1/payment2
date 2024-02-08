import { User } from '@prisma/client';
// import { TransactionEntity } from 'src/transactions/entities/transaction.entity';

export class UserEntity implements User {
  id: number;
  saldo: number;
  data_extrato: Date;
  limite: number;
}
