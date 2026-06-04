import * as bcrypt from 'bcrypt';
// company.service.ts

import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";

import { CreateCompanyDTO } from "./dto/create-company.dto";
import { UpdateCompanyDTO } from "./dto/update-company.dto";
import { LoginCompanyDTO } from "./dto/login-company.dto";

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CompanyService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async findAll() {
        return this.prisma.company.findMany();
    }

    async create(data: CreateCompanyDTO) {
        return this.prisma.company.create({
            data: {
                adminName: data.adminName,
                adminEmail: data.adminEmail,
                passwordAdmin: await bcrypt.hash(data.passwordAdmin, 10),

                representante:
                    data.representante,

                fantasyName:
                    data.fantasyName,

                legalName:
                    data.legalName,

                cnpj: data.cnpj,

                cnpj_status:
                    data.cnpj_status,

                phone: data.phone,

                cep: data.cep,

                state: data.state,

                city: data.city,

                address: data.address,
            },
        });
    }

    async findOne(id: string) {
        const company = await this.prisma.company.findUnique({
            where: {
                id,
            },
        });

        if (!company) {
            throw new NotFoundException('Empresa não encontrada');
        }

        return company;
    }

    async update(id: string, data: UpdateCompanyDTO) {

        const company = await this.prisma.company.findUnique({
            where: { id },
        });

        if (!company) {
            throw new NotFoundException('Empresa não encontrada');
        }

        if (data.cnpj) {
            const companyWithSameCnpj =
                await this.prisma.company.findFirst({
                    where: {
                        cnpj: data.cnpj,
                        NOT: { id },
                    },
                });

            if (companyWithSameCnpj) {
                throw new ConflictException(
                    'CNPJ já está em uso',
                );
            }
        }

        if (data.adminEmail) {
            const companyWithSameEmail =
                await this.prisma.company.findFirst({
                    where: {
                        adminEmail: data.adminEmail,
                        passwordAdmin: await bcrypt.hash(data.passwordAdmin, 10),
                        NOT: { id },
                    },
                });

            if (companyWithSameEmail) {
                throw new ConflictException(
                    'Email já está em uso!',
                );
            }
        }

        return this.prisma.company.update({
            where: { id },
            data,
        });
    }

    async login(data: LoginCompanyDTO) {
        const company = await this.prisma.company.findFirst({
            where: { adminEmail: data.adminEmail },
        });

        if (!company || !company.passwordAdmin) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const valid = await bcrypt.compare(
            data.passwordAdmin,
            company.passwordAdmin,
        );

        if (!valid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: company.id,
            email: company.adminEmail,
            role: 'COMPANY_ADMIN',
            type: 'COMPANY',
        };

        return {
            accessToken: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '15m',
            }),
            refreshToken: this.jwtService.sign(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d',
            }),
        };
    }

}