import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('token')
  @ApiOperation({ summary: 'Authenticate partner and get JWT token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        client_id: { type: 'string', example: 'bank_client_1' },
        client_secret: { type: 'string', example: 'hashed_secret' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'JWT token generated successfully',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() body: { client_id: string; client_secret: string }) {
    const partner = await this.authService.validatePartner(body.client_id, body.client_secret);
    return this.authService.login(partner);
  }
}