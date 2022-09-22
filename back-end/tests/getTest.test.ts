import app from "../src/app";
import supertest from "supertest";
import { randomId } from "./factories/factory";
import {
  disconnectDatabase,
  insertPolarizedVideo,
  insertUniqueVideo,
  randomNumberOfInserts,
  insertNumberOfPopular,
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

  it("requesting a random recommendation expecting failure", async () => {
    const response = await supertest(app).get(`/recommendations/random`);
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
  });

  it("inserting a random number of videos and requesting one of them", async () => {
    await randomNumberOfInserts(4);
    const response = await supertest(app).get(`/recommendations/random`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("inserting a random number of videos and requesting them all", async () => {
    await randomNumberOfInserts(6);
    const response = await supertest(app).get(`/recommendations`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("requesting a very high score video", async () => {
    await insertPolarizedVideo(true);
    const amount = 1;
    const response = await supertest(app).get(`/recommendations/top/${amount}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("requesting more than one video when there are many with high scores", async () => {
    const amount = Math.floor((await insertNumberOfPopular(10)) / 2);
    const response = await supertest(app).get(`/recommendations/top/${amount}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

afterAll(async () => {
  await disconnectDatabase();
});
