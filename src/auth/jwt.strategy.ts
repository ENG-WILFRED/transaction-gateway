import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntegrationPartner, PartnerStatus } from '../entities/integration-partner.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(IntegrationPartner)
    private partnerRepo: Repository<IntegrationPartner>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  async validate(payload: any) {
    const partner = await this.partnerRepo.findOne({
      where: { id: payload.partnerId, status: PartnerStatus.ACTIVE },
    });
    if (!partner) throw new UnauthorizedException('Partner not found or inactive');
    return partner;
  }
}