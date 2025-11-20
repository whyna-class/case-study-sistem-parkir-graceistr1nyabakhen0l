import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        // Menghubungkan ke database saat aplikasi dimulai
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect
    }


}