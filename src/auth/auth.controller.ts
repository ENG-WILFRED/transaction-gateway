import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('token')
  async login(@Body() body: { client_id: string; client_secret: string }) {
    const partner = await this.authService.validatePartner(body.client_id, body.client_secret);
    return this.authService.login(partner);
  }
}