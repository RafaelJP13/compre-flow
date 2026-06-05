import { Test } from '@nestjs/testing';

import { CompanyController } from '../../../src/company/company.controller';
import { CompanyService } from '../../../src/company/company.service';

describe('CompanyController', () => {
    let controller: CompanyController;

    const serviceMock = {
        findAll: jest.fn(),
        create: jest.fn(),
        login: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    };

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [CompanyController],
            providers: [
                {
                    provide: CompanyService,
                    useValue: serviceMock,
                },
            ],
        }).compile();

        controller =
            module.get<CompanyController>(
                CompanyController,
            );
    });

    it('should return companies', async () => {
        serviceMock.findAll.mockResolvedValue([]);

        const result =
            await controller.findAll();

        expect(result).toEqual([]);
    });

    it('should login company and set cookies', async () => {
        serviceMock.login.mockResolvedValue({
            company_access_token:
                'access',
            company_refresh_token:
                'refresh',
        });

        const res = {
            cookie: jest.fn(),
        } as any;

        const result =
            await controller.login(
                {
                    adminEmail:
                        'admin@test.com',
                    passwordAdmin: '123',
                },
                res,
            );

        expect(
            result.message,
        ).toContain('logged');

        expect(res.cookie).toHaveBeenCalledTimes(
            2,
        );
    });
});