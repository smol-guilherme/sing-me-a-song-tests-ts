import { prisma } from "../database";

export async function truncateData() {
  return await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
}
