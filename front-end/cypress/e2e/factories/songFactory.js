import { faker } from "@faker-js/faker";

function randomVideoString() {
  return `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`;
}

export function randomVideoBody() {
  return {
    name: faker.random.words() + " video",
    youtubeLink: randomVideoString(),
  };
}