import { faker } from "@faker-js/faker";

export function randomVideoString() {
  return `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`;
}

export function uniqueVideoString() {
  return "https://www.youtube.com/watch?v=FYP2dM8RTFM";
}

export function randomId() {
  return faker.random.numeric(10);
}
