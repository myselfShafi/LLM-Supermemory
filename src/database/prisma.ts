import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '../../prisma/generated/client.js';
import { db_url } from '../config/env.config.js';

const adapter = new PrismaNeon({database: db_url})
const prisma = new PrismaClient({ adapter });

export default prisma;