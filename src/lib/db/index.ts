import {PrismaClient} from '@prisma/client';

const dbClient = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = dbClient;
}

export default dbClient;
