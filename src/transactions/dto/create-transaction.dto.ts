import { IsString, IsNumber, IsPositive, IsIn, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Unique transaction reference from the bank or M-Pesa',
    example: '9875JHJHSJHDJSH888',
  })
  @IsString()
  transactionId: string;

  @ApiProperty({
    description: 'Contribution amount in the local currency',
    example: 45000,
  })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({
    description: 'Pension member account identifier',
    example: 'DF202600000003',
  })
  @IsString()
  AutoNestID: string;

  @ApiProperty({
    description: 'Date and time of the transaction in YYYY-MM-DD HH:mm:ss format',
    example: '2026-02-16 13:59:24',
  })
  @IsDateString()
  transactionDate: string;

  @ApiProperty({
    description: 'Payment channel origin',
    enum: ['BANK', 'MPESA'],
    example: 'BANK',
  })
  @IsIn(['BANK', 'MPESA'])
  origin: string;
}