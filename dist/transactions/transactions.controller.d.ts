import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { IntegrationPartner } from '../entities/integration-partner.entity';
export declare class TransactionsController {
    private transactionsService;
    constructor(transactionsService: TransactionsService);
    create(dto: CreateTransactionDto, partner: IntegrationPartner): Promise<{
        success: boolean;
        message: string;
        transactionId: string;
    }>;
}
