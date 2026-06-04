import * as bcrypt from 'bcrypt';

import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateCompanyDTO } from './dto/create-company.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';
import { LoginCompanyDTO } from './dto/login-company.dto';

@Injectable()
export class CompanyService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async findAll() {
        return this.prisma.company.findMany();
    }

    async create(data: CreateCompanyDTO) {
        return this.prisma.company.create({
            data: {
                ...data,
                passwordAdmin: await bcrypt.hash(
                    data.passwordAdmin,
                    10,
                ),
            },
        });
    }

    async findOne(id: string) {
        const company =
            await this.prisma.company.findUnique({
                where: { id },
            });

        if (!company) {
            throw new NotFoundException(
                'Empresa não encontrada',
            );
        }

        return company;
    }

    async update(
        id: string,
        data: UpdateCompanyDTO,
    ) {
        const company =
            await this.prisma.company.findUnique({
                where: { id },
            });

        if (!company) {
            throw new NotFoundException(
                'Empresa não encontrada',
            );
        }

        if (data.cnpj) {
            const existingCompany =
                await this.prisma.company.findFirst({
                    where: {
                        cnpj: data.cnpj,
                        NOT: { id },
                    },
                });

            if (existingCompany) {
                throw new ConflictException(
                    'CNPJ já está em uso',
                );
            }
        }

        if (data.adminEmail) {
            const existingCompany =
                await this.prisma.company.findFirst({
                    where: {
                        adminEmail:
                            data.adminEmail,
                        NOT: { id },
                    },
                });

            if (existingCompany) {
                throw new ConflictException(
                    'Email já está em uso',
                );
            }
        }

        if (data.passwordAdmin) {
            data.passwordAdmin =
                await bcrypt.hash(
                    data.passwordAdmin,
                    10,
                );
        }

        return this.prisma.company.update({
            where: { id },
            data,
        });
    }

    async login(
        data: LoginCompanyDTO,
    ) {
        const company =
            await this.prisma.company.findFirst({
                where: {
                    adminEmail:
                        data.adminEmail,
                },
            });

        if (
            !company ||
            !company.passwordAdmin
        ) {
            throw new UnauthorizedException(
                'Invalid credentials',
            );
        }

        const valid =
            await bcrypt.compare(
                data.passwordAdmin,
                company.passwordAdmin,
            );

        if (!valid) {
            throw new UnauthorizedException(
                'Invalid credentials',
            );
        }

        const payload = {
            sub: company.id,
            email: company.adminEmail,
            role: 'COMPANY_ADMIN',
            type: 'COMPANY',
        };

        return {
            company_access_token:
                this.jwtService.sign(
                    payload,
                    {
                        secret:
                            process.env.JWT_SECRET,
                        expiresIn: '15m',
                    },
                ),

            company_refresh_token:
                this.jwtService.sign(
                    payload,
                    {
                        secret:
                            process.env.JWT_REFRESH_SECRET,
                        expiresIn: '7d',
                    },
                ),
        };
    }
}