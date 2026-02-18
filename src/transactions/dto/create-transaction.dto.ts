import { IsString, IsNumber, IsPositive, IsIn, IsDateString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  transactionId: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  AutoNestID: string;

  @IsDateString()
  transactionDate: string;

  @IsIn(['BANK', 'MPESA'])
  origin: string;
}