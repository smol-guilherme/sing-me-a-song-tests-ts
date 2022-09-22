import { faker } from "@faker-js/faker";
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

export function randomId() {
  return faker.random.numeric(5);
}

export function randomVideoBody(): CreateRecommendationData {
  return {
    name: faker.random.words() + " video",
    youtubeLink: randomVideoString(),
  };
}
