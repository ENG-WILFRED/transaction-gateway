import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export enum PartnerStatus {
  ACTIVE = 'ACTIVE',
  REVOKED = 'REVOKED',
}

@Entity('integration_partners')
export class IntegrationPartner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  clientId: string;

  @Column()
  clientSecret: string; // hashed

  @Column({
    type: 'enum',
    enum: PartnerStatus,
    default: PartnerStatus.ACTIVE,
  })
  status: PartnerStatus;

  @Column('simple-json', { nullable: true })
  allowedOrigins: string[];

  @CreateDateColumn()
  createdAt: Date;
}