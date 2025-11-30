import { PrismaNeon } from '@prisma/adapter-neon';
import { db_url } from '../config/env.config.js';
import { PrismaClient } from '../generated/client.js';

const adapter = new PrismaNeon({database: db_url})
const prisma = new PrismaClient({ adapter });

export default prisma;