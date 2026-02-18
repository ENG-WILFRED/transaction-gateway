export declare enum PartnerStatus {
    ACTIVE = "ACTIVE",
    REVOKED = "REVOKED"
}
export declare class IntegrationPartner {
    id: number;
    name: string;
    clientId: string;
    clientSecret: string;
    status: PartnerStatus;
    allowedOrigins: string[];
    createdAt: Date;
}
