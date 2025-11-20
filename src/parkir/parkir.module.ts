import { Module } from '@nestjs/common';
import { ParkirService } from './parkir.service';
import { ParkirController } from './parkir.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Import PrismaModule

@Module({
  imports: [PrismaModule], // Tambahkan PrismaModule
  controllers: [ParkirController],
  providers: [ParkirService],
})
export class ParkirModule {}