import "dotenv/config";
import { randomVideoBody } from "./factories/songFactory.js";

const URL = "http://localhost:3000";

describe("E2E tests", () => {
  const visit = () => cy.visit(URL);

  beforeEach(async () => {
    await cy.resetDatabase();
  });

  beforeEach(() => {
    visit();
    const newInput = randomVideoBody();
    cy.get("[data-cy=song-title]").type(newInput.name);
    cy.get("[data-cy=song-url]").type(newInput.youtubeLink);
    cy.wait(125); // wait to assert the click won't fail due to random delays
    cy.intercept("POST", "/recommendations").as("insertRec");
    cy.get("button").first().click();
    cy.wait("@insertRec");
  });

  it("retrieves the videos from the api where there is no videos", () => {
    visit();
    cy.intercept("GET", `/recommendations`).as("fetchRecs");
    cy.wait("@fetchRecs").its("response.statusCode").should("eq", 304);
  });

  it("succeeds on inserting a new video entry", () => {
    visit();
    const newInput = randomVideoBody();
    cy.get("[data-cy=song-title]").type(newInput.name);
    cy.get("[data-cy=song-url]").type(newInput.youtubeLink);
    cy.wait(125); // wait to assert the click won't fail due to random delays
    cy.intercept("POST", "/recommendations").as("insertRec");
    cy.get("button").first().click();
    cy.wait("@insertRec");
    cy.contains(newInput.name).should("be.visible");
  });

  it("upvotesthe first post from the page", () => {
    visit();
    cy.wait(125);
    cy.intercept("POST", "/recommendations/**").as("clickArrow");
    cy.get("[data-cy=upvote]").first().click();
    cy.wait("@clickArrow").its("response.statusCode").should("eq", 200);
  });

  it("downvotes the first post from the page", () => {
    visit();
    cy.wait(125);
    cy.intercept("POST", "/recommendations/**").as("clickArrow");
    cy.get("[data-cy=downvote]").first().click();
    cy.wait("@clickArrow").its("response.statusCode").should("eq", 200);
  });

  it("request a random song from the database", () => {
    visit();
    cy.intercept("GET", "/recommendations/random").as("randomRec");
    cy.contains("Random").click();
    cy.wait("@randomRec");
    cy.url().should("equal", `${URL}/random`);
    cy.get("[data-cy=rec-component]").should("have.length.of.at.most", 1);
  });

  it("request the most popular videos from the database", () => {
    visit();
    cy.intercept("GET", `/recommendations/top/10`).as("getNTop");
    cy.contains("Top").click();
    cy.wait("@getNTop");
    cy.url().should("equal", `${URL}/top`);
    cy.get("[data-cy=rec-component]").should("have.length.of.at.most", 10);
  });

  it("return to the homepage", () => {
    visit();
    cy.contains("Home").click();
    cy.url().should("equal", `${URL}/`);
  });

  it("adds a video and downvotes it until it is deleted", () => {
    visit();
    cy.get("[data-cy=song-title]").type("The worst love song of all time");
    cy.get("[data-cy=song-url]").type(
      "https://www.youtube.com/watch?v=KAwyWkksXuo"
    );
    cy.wait(125);
    cy.intercept("POST", "/recommendations").as("insertRec");
    cy.get("button").click();
    cy.wait("@insertRec").its("response.statusCode").should("eq", 201);
    // Hitting like 6 times so it gets deleted
    cy.intercept("POST", "/recommendations/**").as("clickArrow");
    for (let i = 0; i < 6; i++) {
      cy.contains("The worst love song of all time")
        .parent()
        .find("[data-cy=downvote]")
        .click()
        .wait("@clickArrow");
    }
    // Now waiting for the song to be removed
    cy.contains("The worst love song of all time").should("not.exist");
  });
});
