import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Res,
} from '@nestjs/common';

import type { Response } from 'express';

import { CompanyService } from './company.service';

import type { UpdateCompanyDTO } from './dto/update-company.dto';
import type { CreateCompanyDTO } from './dto/create-company.dto';
import type { LoginCompanyDTO } from './dto/login-company.dto';

@Controller('companies')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService,
    ) { }

    private readonly cookieOptions = {
        httpOnly: true,
        secure: false,
        sameSite: 'lax' as const,
        path: '/',
    };

    @Get()
    findAll() {
        return this.companyService.findAll();
    }

    @Post()
    async create(
        @Body() body: CreateCompanyDTO,
    ) {
        return this.companyService.create(body);
    }

    @Post('login')
    async login(
        @Body() body: LoginCompanyDTO,
        @Res({ passthrough: true })
        res: Response,
    ) {
        const tokens =
            await this.companyService.login(
                body,
            );

        res.cookie(
            'access_token',
            tokens.accessToken,
            {
                ...this.cookieOptions,
                maxAge:
                    1000 * 60 * 15,
            },
        );

        res.cookie(
            'refresh_token',
            tokens.refreshToken,
            {
                ...this.cookieOptions,
                maxAge:
                    1000 *
                    60 *
                    60 *
                    24 *
                    7,
            },
        );

        return {
            message:
                'Company logged in successfully',
        };
    }

    @Get(':id')
    findOne(
        @Param('id') id: string,
    ) {
        return this.companyService.findOne(
            id,
        );
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() body: UpdateCompanyDTO,
    ) {
        return this.companyService.update(
            id,
            body,
        );
    }
}