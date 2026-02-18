import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { IntegrationPartner } from '../entities/integration-partner.entity';

@ApiTags('Transactions')
@Controller('api/v1/transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Ingest a pension contribution transaction' })
  @ApiResponse({
    status: 200,
    description: 'Transaction recorded successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Transaction recorded' },
        transactionId: { type: 'string', example: '9875JHJHSJHDJSH888' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid JWT' })
  @ApiResponse({ status: 409, description: 'Transaction already processed (idempotency)' })
  async create(@Body() dto: CreateTransactionDto, @GetUser() partner: IntegrationPartner) {
    return this.transactionsService.createTransaction(dto, partner);
  }
}