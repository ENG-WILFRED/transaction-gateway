import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { IntegrationPartner } from '../entities/integration-partner.entity';
export declare class TransactionsService {
    private transactionRepo;
    constructor(transactionRepo: Repository<Transaction>);
    createTransaction(dto: CreateTransactionDto, partner: IntegrationPartner): Promise<{
        success: boolean;
        message: string;
        transactionId: string;
    }>;
}
