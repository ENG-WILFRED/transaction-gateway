"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("../entities/transaction.entity");
let TransactionsService = class TransactionsService {
    transactionRepo;
    constructor(transactionRepo) {
        this.transactionRepo = transactionRepo;
    }
    async createTransaction(dto, partner) {
        const existing = await this.transactionRepo.findOne({ where: { transactionId: dto.transactionId } });
        if (existing) {
            return { success: true, message: 'Transaction already processed', transactionId: existing.transactionId };
        }
        if (dto.amount <= 0)
            throw new common_1.BadRequestException('Amount must be positive');
        const transDate = new Date(dto.transactionDate);
        const now = new Date();
        if (transDate > new Date(now.getTime() + 24 * 60 * 60 * 1000)) {
            throw new common_1.BadRequestException('Transaction date cannot be too far in the future');
        }
        const transaction = this.transactionRepo.create({
            transactionId: dto.transactionId,
            amount: dto.amount,
            autoNestId: dto.AutoNestID,
            transactionDate: transDate,
            origin: dto.origin,
            partnerId: partner.id,
            status: transaction_entity_1.TransactionStatus.POSTED,
        });
        await this.transactionRepo.save(transaction);
        return { success: true, message: 'Transaction recorded', transactionId: transaction.transactionId };
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map