import { PrismaClient } from "#packages/index.js";

const db = new PrismaClient();

export const { user } = db;
