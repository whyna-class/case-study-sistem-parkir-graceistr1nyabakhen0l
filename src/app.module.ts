import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkirModule } from './parkir/parkir.module'; // Import ParkirModule
// import { PrismaModule } from './prisma/prisma.module'; // Tidak perlu jika ParkirModule sudah meng-importnya

@Module({
  imports: [ParkirModule], // Daftarkan ParkirModule
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}