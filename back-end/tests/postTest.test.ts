import app from "../src/app";
import supertest from "supertest";
import { prisma } from "../src/database";
import {
  randomId,
  randomVideoString,
  uniqueVideoString,
} from "./factories/factory";

beforeEach(async () => {
  // truncateAll();
});

describe("POST to / inserting a new recommendation", () => {
  it("inserting the same object twice for conflicts", async () => {
    const body = uniqueVideoString();
    await supertest(app).post("/tests").send(body);
    const { status } = await supertest(app).post("/").send(body);
    expect(status).toBe(409);
  });

  it("inserting a random object with the correct structure and data", async () => {
    const body = randomVideoString();
    const { status } = await supertest(app).post("/").send(body);
    expect(status).toBe(201);
  });

  it("sending an upvote request to id 1 expecting success", async () => {
    const body = uniqueVideoString();
    await supertest(app).post("/tests").send(body);
    const id = "1/upvote";
    const { status } = await supertest(app).post(`/${id}`);
    expect(status).toBe(200);
  });

  it("sending an downvote request to id 1 expecting success", async () => {
    const id = "1/downvote";
    const { status } = await supertest(app).post(`/${id}`);
    expect(status).toBe(200);
  });

  it("sending an upvote request to a random id expecting failure", async () => {
    const id = randomId() + "upvote";
    const { status } = await supertest(app).post(`/${id}`);
    expect(status).toBe(404);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
