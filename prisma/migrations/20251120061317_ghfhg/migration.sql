-- CreateTable
CREATE TABLE `Parkir` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plat_nomor` VARCHAR(191) NOT NULL,
    `jenis_kendaraan` VARCHAR(191) NOT NULL,
    `durasi` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
