import { DataSource } from 'typeorm';
import { IntegrationPartner } from './entities/integration-partner.entity';
import { Transaction } from './entities/transaction.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [IntegrationPartner, Transaction],
  migrations: ['src/migrations/*.ts'],
  synchronize: true,
  logging: false,
});
