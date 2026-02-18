import { IntegrationPartner } from './integration-partner.entity';
export declare enum TransactionStatus {
    PENDING = "PENDING",
    VERIFIED = "VERIFIED",
    POSTED = "POSTED"
}
export declare class Transaction {
    id: number;
    transactionId: string;
    amount: number;
    autoNestId: string;
    transactionDate: Date;
    origin: string;
    status: TransactionStatus;
    partnerId: number;
    partner: IntegrationPartner;
    createdAt: Date;
}
