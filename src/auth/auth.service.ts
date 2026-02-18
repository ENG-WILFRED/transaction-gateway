import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IntegrationPartner, PartnerStatus } from '../entities/integration-partner.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(IntegrationPartner)
    private partnerRepo: Repository<IntegrationPartner>,
    private jwtService: JwtService,
  ) {}

  async validatePartner(clientId: string, clientSecret: string): Promise<IntegrationPartner> {
    const partner = await this.partnerRepo.findOne({ where: { clientId, status: PartnerStatus.ACTIVE } });
    if (!partner) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(clientSecret, partner.clientSecret);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    return partner;
  }

  async login(partner: IntegrationPartner) {
    const payload = { partnerId: partner.id, clientId: partner.clientId, origin: partner.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}