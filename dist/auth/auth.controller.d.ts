import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: {
        client_id: string;
        client_secret: string;
    }): Promise<{
        access_token: string;
    }>;
}
