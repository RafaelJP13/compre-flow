import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name);

    constructor(private readonly prisma: PrismaService) { }

    async run() {
        this.logger.log('🌱 Starting database seed...');
        await this.seedUsers();

        this.logger.log('✅ Database seeding completed');
    }



    private async seedUsers() {
        const usersCount = await this.prisma.user.count();

        if (usersCount > 0) {
            this.logger.log('👤 Users already seeded, skipping...');
            return;
        }

        const hashedPassword = await bcrypt.hash('123456', 10);

        await this.prisma.user.createMany({
            data: [
                {
                    name: 'Platform Owner',
                    email: 'owner@test.com',
                    password: hashedPassword,
                    role: Role.OWNER,
                },
            ],
        });

        this.logger.log('👤 Users seeded successfully');
    }
}