import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { IntegrationPartner } from '../entities/integration-partner.entity';
export declare class AuthService {
    private partnerRepo;
    private jwtService;
    constructor(partnerRepo: Repository<IntegrationPartner>, jwtService: JwtService);
    validatePartner(clientId: string, clientSecret: string): Promise<IntegrationPartner>;
    login(partner: IntegrationPartner): Promise<{
        access_token: string;
    }>;
}
