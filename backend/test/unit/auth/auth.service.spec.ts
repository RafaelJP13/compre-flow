import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthService } from '../../../src/auth/auth.service';
import { PrismaService } from '../../../prisma/prisma.service';

jest.mock('bcrypt');

describe('AuthService', () => {
    let service: AuthService;

    const prismaMock = {
        user: {
            findUnique: jest.fn(),
            create: jest.fn(),
        },
    };

    const jwtMock = {
        sign: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule =
            await Test.createTestingModule({
                providers: [
                    AuthService,
                    {
                        provide: PrismaService,
                        useValue: prismaMock,
                    },
                    {
                        provide: JwtService,
                        useValue: jwtMock,
                    },
                ],
            }).compile();

        service = module.get(AuthService);

        jest.clearAllMocks();
    });

    describe('register', () => {
        it('should create user', async () => {
            prismaMock.user.findUnique.mockResolvedValue(null);

            (bcrypt.hash as jest.Mock).mockResolvedValue(
                'hashed-password',
            );

            prismaMock.user.create.mockResolvedValue({
                id: '1',
                email: 'test@test.com',
            });

            const result = await service.register({
                name: 'Test',
                email: 'test@test.com',
                password: '123456',
            });

            expect(result.id).toBe('1');

            expect(
                prismaMock.user.create,
            ).toHaveBeenCalled();
        });

        it('should throw when user exists', async () => {
            prismaMock.user.findUnique.mockResolvedValue({
                id: '1',
            });

            await expect(
                service.register({
                    email: 'test@test.com',
                }),
            ).rejects.toThrow(BadRequestException);
        });
    });

    describe('login', () => {
        it('should login successfully', async () => {
            prismaMock.user.findUnique.mockResolvedValue({
                id: '1',
                email: 'test@test.com',
                password: 'hashed',
                role: 'ADMIN',
            });

            (bcrypt.compare as jest.Mock).mockResolvedValue(
                true,
            );

            jest.spyOn(
                service,
                'generateTokens',
            ).mockReturnValue({
                accessToken: 'access',
                refreshToken: 'refresh',
            });

            const result = await service.login({
                email: 'test@test.com',
                password: '123456',
            });

            expect(result.accessToken).toBe(
                'access',
            );
        });

        it('should throw if user not found', async () => {
            prismaMock.user.findUnique.mockResolvedValue(
                null,
            );

            await expect(
                service.login({
                    email: 'x',
                    password: 'x',
                }),
            ).rejects.toThrow(
                UnauthorizedException,
            );
        });

        it('should throw if password invalid', async () => {
            prismaMock.user.findUnique.mockResolvedValue({
                password: 'hashed',
            });

            (bcrypt.compare as jest.Mock).mockResolvedValue(
                false,
            );

            await expect(
                service.login({
                    email: 'x',
                    password: 'x',
                }),
            ).rejects.toThrow(
                UnauthorizedException,
            );
        });
    });

    describe('generateTokens', () => {
        it('should generate access and refresh tokens', () => {
            jwtMock.sign
                .mockReturnValueOnce('access')
                .mockReturnValueOnce('refresh');

            const result =
                service.generateTokens({
                    id: '1',
                    email: 'test@test.com',
                    role: 'ADMIN',
                });

            expect(result).toEqual({
                accessToken: 'access',
                refreshToken: 'refresh',
            });

            expect(jwtMock.sign).toHaveBeenCalledTimes(
                2,
            );
        });
    });
});