import { Transaction } from '@prisma/client';

export class TransactionEntity implements Transaction {
  userId: number;
  id: number;
  valor: number;
  tipo: string;
  descricao: string;
  realizada_em: Date;
}
