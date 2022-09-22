import { prisma } from "../../src/database";
import { randomVideoBody } from "./factory";

export async function truncateAll() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations CASCADE;`;
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
}

export async function randomNumberOfInserts(max: number) {
  const maxNumber = Math.floor(Math.random() * max);
  const data = [];
  for (let i = 0; i < maxNumber; i++) data.push(randomVideoBody());
  await prisma.recommendation.createMany({ data });
  return maxNumber;
}
