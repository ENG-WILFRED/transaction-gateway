import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IntegrationPartner } from './integration-partner.entity';

export enum TransactionStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  POSTED = 'POSTED',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  transactionId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  autoNestId: string;

  @Column()
  transactionDate: Date;

  @Column()
  origin: string;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @Column()
  partnerId: number;

  @ManyToOne(() => IntegrationPartner)
  @JoinColumn({ name: 'partnerId' })
  partner: IntegrationPartner;

  @CreateDateColumn()
  createdAt: Date;
}