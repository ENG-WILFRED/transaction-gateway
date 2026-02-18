import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { IntegrationPartner } from '../entities/integration-partner.entity';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private partnerRepo;
    constructor(partnerRepo: Repository<IntegrationPartner>);
    validate(payload: any): Promise<IntegrationPartner>;
}
export {};
