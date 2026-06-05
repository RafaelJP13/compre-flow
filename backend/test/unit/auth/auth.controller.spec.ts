import { Test } from '@nestjs/testing';

import { AuthController } from '../../../src/auth/auth.controller';
import { AuthService } from '../../../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
    let controller: AuthController;

    const authServiceMock = {
        register: jest.fn(),
        login: jest.fn(),
        generateTokens: jest.fn(),
    };

    const jwtMock = {
        verify: jest.fn(),
        sign: jest.fn(),
    };

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: authServiceMock,
                },
                {
                    provide: JwtService,
                    useValue: jwtMock,
                },
            ],
        }).compile();

        controller =
            module.get<AuthController>(
                AuthController,
            );
    });

    it('should register user', async () => {
        const user = {
            id: '1',
            email: 'test@test.com',
        };

        authServiceMock.register.mockResolvedValue(
            user,
        );

        authServiceMock.generateTokens.mockReturnValue(
            {
                accessToken: 'access',
                refreshToken: 'refresh',
            },
        );

        const res = {
            cookie: jest.fn(),
        } as any;

        const result = await controller.register(
            user as any,
            res,
        );

        expect(result).toEqual(user);
        expect(res.cookie).toHaveBeenCalledTimes(
            2,
        );
    });

    it('should logout', () => {
        const res = {
            cookie: jest.fn(),
        } as any;

        const result =
            controller.logout(res);

        expect(result.message).toContain(
            'Logged out',
        );

        expect(res.cookie).toHaveBeenCalledTimes(
            2,
        );
    });
});