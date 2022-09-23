import { faker } from "@faker-js/faker";
import { Recommendation } from "@prisma/client";
import { CreateRecommendationData } from "../../src/services/recommendationsService";

function randomVideoString() {
  return `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`;
}

export function uniqueVideoBody(): CreateRecommendationData {
  return {
    name: "the unique video",
    youtubeLink: "https://www.youtube.com/watch?v=FYP2dM8RTFM",
  };
}

export function fullVideoBody(data?: CreateRecommendationData): Recommendation {
  return {
    id: Math.ceil(Math.random() * 5),
    ...(data || { ...uniqueVideoBody() }),
    score: Math.ceil(Math.random() * 50),
  };
}

export function randomId() {
  return faker.random.numeric(5);
}

export function randomVideoBody(): CreateRecommendationData {
  return {
    name: faker.random.words() + " video",
    youtubeLink: randomVideoString(),
  };
}

export function polarizedScore(positive: boolean): number {
  const signal = () => {
    if (positive) return 1;
    return -1;
  };
  return signal() * Math.floor(Math.random() * 50);
}
