-- CreateTable
CREATE TABLE `RateLimit` (
    `ip` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 0,
    `lastRequest` BIGINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`ip`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
