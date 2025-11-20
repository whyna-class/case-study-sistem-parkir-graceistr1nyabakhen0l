// src/parkir/parkir.controller.ts

import { Controller, Get, Post, Body, Patch,
    Param,
    Delete,  // <-- Import Delete
    ParseIntPipe // <-- Import ParseIntPipe
} from '@nestjs/common';
import { ParkirService } from './parkir.service';
import { CreateParkirDto } from './dto/create-parkir.dto';
import { UpdateParkirDto } from './dto/update-parkir.dto';
import { Parkir } from '@prisma/client'; // Import Tipe Parkir

@Controller('parkir')
export class ParkirController {
    constructor(private readonly parkirService: ParkirService) { }

    // 1. POST /parkir (CREATE)
    @Post()
    async create(@Body() createParkirDto: CreateParkirDto): Promise<Parkir> {
        return this.parkirService.create(createParkirDto);
    }

    // 2. GET /parkir (Ambil Semua Data)
    @Get()
    async findAll(): Promise<Parkir[]> {
        return this.parkirService.findAll();
    }

    // 3. GET /parkir/total (Hitung Total Pendapatan)
    // Endpoint statis (total) harus didefinisikan sebelum endpoint dinamis (:id)
    @Get('total')
    async findTotalIncome(): Promise<number> {
        return this.parkirService.findTotalIncome();
    }

    // 4. GET /parkir/:id (Ambil Detail Data)
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Parkir> {
        return this.parkirService.findOne(id);
    }

    // 5. PATCH /parkir/:id (UPDATE)
    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateParkirDto: UpdateParkirDto,
    ): Promise<Parkir> {
        return this.parkirService.update(id, updateParkirDto);
    }

    // 6. DELETE /parkir/:id
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<Parkir> {
        return this.parkirService.remove(id);
    }
}