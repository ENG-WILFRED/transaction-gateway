import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, TransactionStatus } from '../entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { IntegrationPartner } from '../entities/integration-partner.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {}

  async createTransaction(dto: CreateTransactionDto, partner: IntegrationPartner) {
    // Check idempotency
    const existing = await this.transactionRepo.findOne({ where: { transactionId: dto.transactionId } });
    if (existing) {
      return { success: true, message: 'Transaction already processed', transactionId: existing.transactionId };
    }

    // Validate amount
    if (dto.amount <= 0) throw new BadRequestException('Amount must be positive');

    // Validate date not too future
    const transDate = new Date(dto.transactionDate);
    const now = new Date();
    if (transDate > new Date(now.getTime() + 24 * 60 * 60 * 1000)) { // 1 day future
      throw new BadRequestException('Transaction date cannot be too far in the future');
    }

    // Create transaction
    const transaction = this.transactionRepo.create({
      transactionId: dto.transactionId,
      amount: dto.amount,
      autoNestId: dto.AutoNestID,
      transactionDate: transDate,
      origin: dto.origin,
      partnerId: partner.id,
      status: TransactionStatus.POSTED, // assume posted immediately
    });

    await this.transactionRepo.save(transaction);

    return { success: true, message: 'Transaction recorded', transactionId: transaction.transactionId };
  }
}