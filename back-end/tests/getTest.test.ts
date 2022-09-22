import app from "../src/app";
import supertest from "supertest";
import { randomId } from "./factories/factory";
import {
  disconnectDatabase,
  insertUniqueVideo,
  randomNumberOfInserts,
  truncateAll,
} from "./factories/dbFactory";

beforeEach(async () => {
  await truncateAll();
});

describe("testing GET requests for the API services", () => {
  it("requesting a recommendation with id 1 expecting success", async () => {
    await insertUniqueVideo();
    const id = "1";
    const response = await supertest(app).get(`/recommendations/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("requesting a recommendation with a random id expecting failure", async () => {
    const id = randomId();
    const response = await supertest(app).get(`/recommendations${id}`);
    expect(response.status).toBe(404);
  });

  it("inserting a random number of videos and requesting some of them", async () => {
    const maxNumber = await randomNumberOfInserts(8);
    const maxHalf = Math.floor(maxNumber / 2);
    const response = await supertest(app).get(
      `/recommendations/top/${maxHalf}`
    );
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    console.log(response.body);
  });

  it("inserting a random number of videos and requesting one of them", async () => {
    await randomNumberOfInserts(4);
    const response = await supertest(app).get(`/recommendations/random`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

afterAll(async () => {
  await disconnectDatabase();
});
