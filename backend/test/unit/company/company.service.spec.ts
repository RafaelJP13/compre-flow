import { Test } from '@nestjs/testing';
import {
    ConflictException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { CompanyService } from '../../../src/company/company.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

jest.mock('bcrypt');

describe('CompanyService', () => {
    let service: CompanyService;

    const prismaMock = {
        company: {
            findMany: jest.fn(),
            create: jest.fn(),
            findUnique: jest.fn(),
            findFirst: jest.fn(),
            update: jest.fn(),
        },
    };

    const jwtMock = {
        sign: jest.fn(),
    };

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                CompanyService,
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

        service =
            module.get<CompanyService>(
                CompanyService,
            );

        jest.clearAllMocks();
    });

    it('should find all companies', async () => {
        prismaMock.company.findMany.mockResolvedValue(
            [],
        );

        const result =
            await service.findAll();

        expect(result).toEqual([]);
    });

    it('should throw when company not found', async () => {
        prismaMock.company.findUnique.mockResolvedValue(
            null,
        );

        await expect(
            service.findOne('1'),
        ).rejects.toThrow(
            NotFoundException,
        );
    });

    it('should login company', async () => {
        prismaMock.company.findFirst.mockResolvedValue(
            {
                id: '1',
                adminEmail: 'admin@test.com',
                passwordAdmin: 'hashed',
            },
        );

        (bcrypt.compare as jest.Mock).mockResolvedValue(
            true,
        );

        jwtMock.sign
            .mockReturnValueOnce('access')
            .mockReturnValueOnce('refresh');

        const result =
            await service.login({
                adminEmail:
                    'admin@test.com',
                passwordAdmin: '123',
            });

        expect(
            result.company_access_token,
        ).toBe('access');
    });

    it('should throw invalid credentials', async () => {
        prismaMock.company.findFirst.mockResolvedValue(
            null,
        );

        await expect(
            service.login({
                adminEmail: 'x',
                passwordAdmin: 'x',
            }),
        ).rejects.toThrow(
            UnauthorizedException,
        );
    });

    it('should throw duplicate cnpj', async () => {
        prismaMock.company.findUnique.mockResolvedValue(
            {
                id: '1',
            },
        );

        prismaMock.company.findFirst.mockResolvedValue(
            {
                id: '2',
            },
        );

        await expect(
            service.update('1', {
                cnpj:
                    '11.111.111/1111-11',
            }),
        ).rejects.toThrow(
            ConflictException,
        );
    });
});