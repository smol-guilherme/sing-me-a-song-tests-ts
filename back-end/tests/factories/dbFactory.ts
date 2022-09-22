import { prisma } from "../../src/database";
import { randomVideoBody, uniqueVideoBody } from "./factory";

export async function truncateAll() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY;`;
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
}

export async function randomNumberOfInserts(max: number) {
  const maxNumber = Math.ceil(Math.random() * max);
  const data = [];
  for (let i = 0; i < maxNumber; i++) data.push(randomVideoBody());
  await prisma.recommendation.createMany({ data });
  return maxNumber;
}

export async function insertNumberOfPopular(max: number): Promise<number> {
  for (let i = 0; i < max; i++) {
    await insertPolarizedVideo(true, i + 1);
  }
  return max;
}

export async function insertUniqueVideo() {
  return await prisma.recommendation.create({ data: uniqueVideoBody() });
}

export async function insertPolarizedVideo(flag: boolean, id = 1) {
  await prisma.recommendation.create({ data: randomVideoBody() });
  await prisma.recommendation.update({
    where: {
      id,
    },
    data: {
      score: polarizedScore(flag),
    },
  });
}

function polarizedScore(positive: boolean): number {
  const signal = () => {
    if (positive) return 1;
    return -1;
  };
  return signal() * Math.floor(Math.random() * 50);
}
