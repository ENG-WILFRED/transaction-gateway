import { DataSource } from 'typeorm';
import { IntegrationPartner } from './entities/integration-partner.entity';
import { Transaction } from './entities/transaction.entity';

// Enable SSL for remote databases (non-localhost)
const shouldUseSsl = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost');

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [IntegrationPartner, Transaction],
  synchronize: true,
  logging: false,
  ssl: shouldUseSsl ? { rejectUnauthorized: false } : false,
});
