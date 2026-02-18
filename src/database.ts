import { DataSource } from 'typeorm';
import { IntegrationPartner } from './entities/integration-partner.entity';
import { Transaction } from './entities/transaction.entity';

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [IntegrationPartner, Transaction],
  synchronize: true,
  logging: false,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});
