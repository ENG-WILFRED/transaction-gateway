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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationPartner = exports.PartnerStatus = void 0;
const typeorm_1 = require("typeorm");
var PartnerStatus;
(function (PartnerStatus) {
    PartnerStatus["ACTIVE"] = "ACTIVE";
    PartnerStatus["REVOKED"] = "REVOKED";
})(PartnerStatus || (exports.PartnerStatus = PartnerStatus = {}));
let IntegrationPartner = class IntegrationPartner {
    id;
    name;
    clientId;
    clientSecret;
    status;
    allowedOrigins;
    createdAt;
};
exports.IntegrationPartner = IntegrationPartner;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], IntegrationPartner.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], IntegrationPartner.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], IntegrationPartner.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], IntegrationPartner.prototype, "clientSecret", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PartnerStatus,
        default: PartnerStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], IntegrationPartner.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-json', { nullable: true }),
    __metadata("design:type", Array)
], IntegrationPartner.prototype, "allowedOrigins", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], IntegrationPartner.prototype, "createdAt", void 0);
exports.IntegrationPartner = IntegrationPartner = __decorate([
    (0, typeorm_1.Entity)('integration_partners')
], IntegrationPartner);
//# sourceMappingURL=integration-partner.entity.js.map