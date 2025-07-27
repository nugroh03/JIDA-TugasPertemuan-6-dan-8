import { PrismaClient } from '@prisma/client';
import { config, getCurrentDbConfig } from './config';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: getCurrentDbConfig().logging ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: config.databaseUrl,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
