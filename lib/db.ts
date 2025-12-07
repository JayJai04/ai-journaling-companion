import { PrismaClient } from '@prisma/client';
import { MongoClient, Db } from 'mongodb';

// Prisma client for PostgreSQL (users)
let prisma: PrismaClient;

declare global {
  var __prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient();
  }
  prisma = global.__prisma;
}

// MongoDB client for journal entries
let mongoClient: MongoClient | null = null;
let mongoDb: Db | null = null;

export async function getMongoDb(): Promise<Db> {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  if (mongoDb) {
    return mongoDb;
  }

  if (!mongoClient) {
    mongoClient = new MongoClient(process.env.MONGODB_URI);
    await mongoClient.connect();
  }

  mongoDb = mongoClient.db();
  return mongoDb;
}

export { prisma };

