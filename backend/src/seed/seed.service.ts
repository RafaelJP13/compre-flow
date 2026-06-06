import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name);

    constructor(private readonly prisma: PrismaService) { }

    async run() {
        this.logger.log('🌱 Starting database seed...');

        await this.seedRoles();
        await this.seedPermissions();
        await this.seedCompanies();
        await this.seedUsers();
        await this.seedCompanyRolePermissions();

        this.logger.log('✅ Database seeding completed');
    }

    // -------------------------
    // ROLES (GLOBAL)
    // -------------------------
    private async seedRoles() {
        const rolesCount = await this.prisma.role.count();

        if (rolesCount > 0) {
            this.logger.log('🔐 Roles already seeded, skipping...');
            return;
        }

        await this.prisma.role.createMany({
            data: [
                { name: 'OWNER', description: 'Platform owner' },
                { name: 'COMPANY_ADMIN', description: 'Company administrator' },
                { name: 'EMPLOYEE', description: 'Employee' },
            ],
            skipDuplicates: true,
        });

        this.logger.log('🔐 Roles seeded');
    }

    // -------------------------
    // PERMISSIONS (GLOBAL)
    // -------------------------
    private async seedPermissions() {
        const count = await this.prisma.permission.count();

        if (count > 0) {
            this.logger.log('🔑 Permissions already seeded, skipping...');
            return;
        }

        await this.prisma.permission.createMany({
            data: [
                { module: 'users', name: 'users.create' },
                { module: 'users', name: 'users.read' },
                { module: 'users', name: 'users.update' },
                { module: 'users', name: 'users.delete' },

                { module: 'products', name: 'products.create' },
                { module: 'products', name: 'products.read' },
                { module: 'products', name: 'products.update' },
                { module: 'products', name: 'products.delete' },

                { module: 'orders', name: 'orders.create' },
                { module: 'orders', name: 'orders.read' },
                { module: 'orders', name: 'orders.update' },
                { module: 'orders', name: 'orders.cancel' },

                { module: 'branches', name: 'branches.create' },
                { module: 'branches', name: 'branches.read' },
                { module: 'branches', name: 'branches.update' },
                { module: 'branches', name: 'branches.delete' },

                { module: 'dashboard', name: 'dashboard.read' },
                { module: 'reports', name: 'reports.read' },
            ],
            skipDuplicates: true,
        });

        this.logger.log('🔑 Permissions seeded');
    }

    // -------------------------
    // COMPANIES (needed for mapping)
    // -------------------------
    private async seedCompanies() {
        const count = await this.prisma.company.count();

        if (count > 0) {
            this.logger.log('🏢 Companies already seeded, skipping...');
            return;
        }

        await this.prisma.company.create({
            data: {
                adminName: 'Demo Admin',
                adminEmail: 'admin@company.com',
                passwordAdmin: await bcrypt.hash('123456', 10),

                representante: 'Demo Rep',
                fantasyName: 'Demo Company',
                legalName: 'Demo Company LTDA',

                cnpj: '00000000000000',
                cnpj_status: 'VALID',

                phone: '000000000',
                cep: '00000000',
                state: 'SP',
                city: 'Sao Vicente',
                address: 'Demo Street',
            },
        });

        this.logger.log('🏢 Company seeded');
    }

    // -------------------------
    // USERS
    // -------------------------
    private async seedUsers() {
        const count = await this.prisma.user.count();

        if (count > 0) {
            this.logger.log('👤 Users already seeded, skipping...');
            return;
        }

        const hashedPassword = await bcrypt.hash('123456', 10);

        const ownerRole = await this.prisma.role.findUnique({
            where: { name: 'OWNER' },
        });

        const company = await this.prisma.company.findFirst();

        if (!ownerRole || !company) {
            throw new Error('Missing role or company');
        }

        await this.prisma.user.create({
            data: {
                name: 'Platform Owner',
                email: 'owner@test.com',
                password: hashedPassword,
                roleId: ownerRole.id,
                companyId: company.id,
            },
        });

        this.logger.log('👤 Users seeded');
    }

    // -------------------------
    // COMPANY ROLE PERMISSIONS (CORE RBAC)
    // -------------------------
    private async seedCompanyRolePermissions() {
        const count = await this.prisma.companyRolePermission.count();

        if (count > 0) {
            this.logger.log('🔗 CompanyRolePermissions already seeded, skipping...');
            return;
        }

        const company = await this.prisma.company.findFirst();

        if (!company) throw new Error('Company not found');

        const roles = await this.prisma.role.findMany();
        const permissions = await this.prisma.permission.findMany();

        const roleMap = Object.fromEntries(roles.map(r => [r.name, r]));
        const permMap = Object.fromEntries(permissions.map(p => [p.name, p]));

        const seed: { role: string; permissions: string[] }[] = [
            {
                role: 'OWNER',
                permissions: permissions.map(p => p.name),
            },
            {
                role: 'COMPANY_ADMIN',
                permissions: [
                    'users.create',
                    'users.read',
                    'users.update',
                    'products.create',
                    'products.read',
                    'products.update',
                    'orders.create',
                    'orders.read',
                    'orders.update',
                    'branches.read',
                    'dashboard.read',
                ],
            },
            {
                role: 'EMPLOYEE',
                permissions: [
                    'products.read',
                    'orders.create',
                    'orders.read',
                    'dashboard.read',
                ],
            },
        ];

        for (const item of seed) {
            const role = roleMap[item.role];

            for (const permName of item.permissions) {
                const permission = permMap[permName];

                if (!role || !permission) continue;

                await this.prisma.companyRolePermission.create({
                    data: {
                        companyId: company.id,
                        roleId: role.id,
                        permissionId: permission.id,
                    },
                });
            }
        }

        this.logger.log('🔗 CompanyRolePermissions seeded');
    }
}