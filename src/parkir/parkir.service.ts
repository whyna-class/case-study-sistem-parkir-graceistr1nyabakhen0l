// src/parkir/parkir.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { jenis_kendaraan, Parkir } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParkirDto } from './dto/create-parkir.dto';
import { UpdateParkirDto } from './dto/update-parkir.dto';

// --- Definisi Tarif Parkir ---

// --- End Definisi Tarif ---


@Injectable()
export class ParkirService {
    constructor(private prisma: PrismaService) { }

    /**
     * Logika Perhitungan Total Biaya Parkir berdasarkan jenis kendaraan dan durasi.
     */
    private hitungTotal(jenis_kendaraan: jenis_kendaraan, durasi: number): number {
        let jam_pertama
        let jam_berikutnya

        if (jenis_kendaraan === 'roda2') {
            jam_berikutnya = 2000
            jam_pertama = 3000
        } else if (jenis_kendaraan === 'roda4') {
            jam_berikutnya = 4000
            jam_pertama = 6000
        }
        let total: number;

        if (durasi === 1) {
            // 1 jam pertama
            total = jam_pertama || jam_pertama;
        } else if (durasi > 1) {
            // Rumus: total = tarif jam pertama + (durasi - 1) x tarif per jam berikutnya
            const jamBerikutnya = durasi - 1;
            const biayaTambahan = jamBerikutnya * jam_berikutnya;
            total = jam_pertama + biayaTambahan;
        } else {
            total = 0; // Durasi 0 atau negatif
        }
        return total;
    }

    // 1. --- Endpoint: POST /parkir (CREATE) ---
    async create(createParkirDto: CreateParkirDto): Promise<Parkir> {
        // Menggunakan properti snake_case sesuai Postman dan DTO terbaru:
        const { jenis_kendaraan, durasi, plat_nomor } = createParkirDto;

        // Hitung total biaya otomatis
        const total = this.hitungTotal(jenis_kendaraan, durasi);

        return this.prisma.parkir.create({
            data: {
                plat_nomor,
                jenis_kendaraan,
                durasi,
                total, // Total dihitung dan disimpan
            },
        });
    }

    // 2. --- Endpoint: PATCH /parkir/:id (UPDATE) ---
    async update(id: number, updateParkirDto: UpdateParkirDto): Promise<Parkir> {
        const { durasi: durasiBaru } = updateParkirDto;

        // 1. Ambil data parkir lama untuk mendapatkan jenis kendaraan
        const dataLama = await this.prisma.parkir.findUnique({
            where: { id },
        });

        if (!dataLama) {
            throw new NotFoundException('Data parkir dengan ID ${id} tidak ditemukan');
        }

        // 2. Hitung total biaya baru berdasarkan durasi yang baru
        const totalBiayaBaru = this.hitungTotal(
            dataLama.jenis_kendaraan as jenis_kendaraan,
            durasiBaru,
        );

        // 3. Update durasi dan total di database
        return this.prisma.parkir.update({
            where: { id },
            data: {
                durasi: durasiBaru,
                total: totalBiayaBaru, // Total dihitung ulang otomatis
            },
        });
    }

    // 3. --- Endpoint: GET /parkir (Ambil Semua Data) ---
    async findAll(): Promise<Parkir[]> {
        return this.prisma.parkir.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    // 4. --- Endpoint: GET /parkir/:id (Ambil Detail Data) ---
    async findOne(id: number): Promise<Parkir> {
        const parkir = await this.prisma.parkir.findUnique({
            where: { id },
        });

        if (!parkir) {
            throw new NotFoundException('Data parkir dengan ID ${id} tidak ditemukan');
        }
        return parkir;
    }

    // 5. --- Endpoint: GET /parkir/total (Hitung Total Pendapatan) ---
    async findTotalIncome(): Promise<number> {
        const result = await this.prisma.parkir.aggregate({
            _sum: {
                total: true, // Menjumlahkan kolom 'total'
            },
        });

        // Mengembalikan total pendapatan dari semua data parkir
        return result._sum.total || 0;
    }

    // 6. --- Endpoint: DELETE /parkir/:id (Hapus Data) ---
    async remove(id: number): Promise<Parkir> {
        try {
            return await this.prisma.parkir.delete({
                where: { id },
            });
        } catch (error) {
            // Error 'P2025' adalah kode Prisma untuk 'record not found'
            if (error.code === 'P2025') {
                throw new NotFoundException('Data parkir dengan ID ${id} tidak ditemukan');
            }
            throw error;
        }
    }
}