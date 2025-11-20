import {
    IsNotEmpty,
    IsInt,
    Min,
    IsIn,
    IsString
} from 'class-validator';
import { Type } from 'class-transformer';
import { jenis_kendaraan } from '@prisma/client';

export class CreateParkirDto {

    @IsString({ message: 'Plat nomor harus berupa teks.' })
    @IsNotEmpty({ message: 'Plat nomor tidak boleh kosong.' })
    plat_nomor: string;

    @IsString({ message: 'Jenis kendaraan harus berupa teks.' })
    @IsIn(['roda2', 'roda4'], { message: 'Jenis kendaraan harus "roda2" atau "roda4".' })
    jenis_kendaraan: jenis_kendaraan;

    @Type(() => Number)
    @IsInt({ message: 'Durasi harus berupa bilangan bulat.' })
    @Min(1, { message: 'Durasi harus lebih dari 0 jam.' })
    durasi: number;
}