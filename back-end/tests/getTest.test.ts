import app from "../src/app";
import supertest from "supertest";
import {
  randomId,
  randomNumberOfInserts,
  uniqueVideoBody,
} from "./factories/factory";
import { disconnectDatabase, truncateAll } from "./factories/dbFactory";

beforeEach(async () => {
  truncateAll();
});

describe("testing GET requests for the API services", () => {
  it("requesting a recommendation with id 1 expecting success", async () => {
    const body = uniqueVideoBody();
    await supertest(app).post("/").send(body);
    const id = "1";
    const response = await supertest(app).get(`/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("requesting a recommendation with a random id expecting failure", async () => {
    const id = randomId();
    const response = await supertest(app).get(`/${id}`);
    expect(response.status).toBe(404);
  });

  it("inserting a random number of videos and requesting some of them", async () => {
    const maxNumber = randomNumberOfInserts(8);
    const maxHalf = Math.floor(maxNumber / 2);
    const response = await supertest(app).get(`/top/${maxHalf}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length!).toBe(maxHalf);
  });

  it("inserting a random number of videos and requesting one of them", async () => {
    randomNumberOfInserts(4);
    const response = await supertest(app).get(`/random`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

afterAll(async () => {
  await disconnectDatabase();
});
