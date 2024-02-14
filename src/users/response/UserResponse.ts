import { TransactionEntity } from '../../transactions/entities/transaction.entity';

export interface UserResponse {
  saldo: {
    total: number; // Calculated sum of transactions
    data_extrato: Date; // Most recent transaction's date
    limite: number; // User's limit
  };
  ultimas_transacoes: TransactionEntity[]; // Array of the last few transactions
}
