import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

// Karena DTO ini hanya untuk update durasi, kita hanya masukkan durasi
export class UpdateParkirDto {
    @Type(() => Number)
    @IsInt({ message: 'Durasi harus berupa bilangan bulat.' })
    @Min(1, { message: 'Durasi harus lebih dari 0 jam.' })
    durasi: number;
}