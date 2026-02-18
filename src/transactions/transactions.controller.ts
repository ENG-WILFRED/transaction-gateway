import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { IntegrationPartner } from '../entities/integration-partner.entity';

@Controller('api/v1/transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateTransactionDto, @GetUser() partner: IntegrationPartner) {
    return this.transactionsService.createTransaction(dto, partner);
  }
}