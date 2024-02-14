import {
  IsString,
  IsNotEmpty,
  IsNumber,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(10)
  descricao: string;

  userId: number;
}
