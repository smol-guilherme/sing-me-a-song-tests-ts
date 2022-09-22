import { faker } from "@faker-js/faker";
import { CreateRecommendationData } from "../../src/services/recommendationsService";

export function randomVideoString() {
  return `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`;
}

export function uniqueVideoBody() {
  return {
    name: faker.random.words() + " video",
    youtubeLink: "https://www.youtube.com/watch?v=FYP2dM8RTFM",
  };
}

export function randomId() {
  return faker.random.numeric(5);
}

export function randomNumberOfInserts(max: number) {
  return Math.floor(Math.random() * max);
}

export function randomVideoBody(): CreateRecommendationData {
  return {
    name: faker.random.words() + " video",
    youtubeLink: randomVideoString(),
  };
}
