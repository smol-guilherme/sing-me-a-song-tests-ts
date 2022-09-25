import "dotenv/config";

const URL = "http://localhost:3000";
const API_URL = process.env.REACT_APP_API_BASE_URL;

describe("E2E tests", () => {
  const visit = () => cy.visit(URL);

  it("retrieves the videos from the api", async () => {
    visit().then(() => {
      cy.intercept("GET", `/recommendations`).then((response) => {
        const data = response.data;
        expect(data).toBeInstanceOf(Array);
      });
    });
  });

  it("succeeds on inserting a new video entry", () => {
    visit().then(() => {
      cy.get("input[placeholder='Name']").type("Tacica song slaps");
      cy.get("input[placeholder='https://youtu.be/...']").type(
        "https://www.youtube.com/watch?v=fu2QzRY8IUI"
      );
      cy.wait(500);
      cy.get("button").click();
      cy.intercept("POST", `/recommendations`).then(() => {
        cy.contains("Tacica song slaps").should("be.visible");
      });
    });
  });

  it("upvotes and downvotes the first post from the page", () => {
    visit().then(() => {
      cy.wait(500);
      cy.get("[data-cy=upvote]").click();
      cy.wait(1500);
      cy.get("[data-cy=downvote]").click();
    });
  });

  it("request a random song from the database", () => {
    visit().then(() => {
      cy.contains("Random").click();
      cy.url().should("equal", `${URL}/random`);
    });
  });

  it("request the most popular videos from the database", () => {
    visit().then(() => {
      cy.contains("Top").click();
      cy.url().should("equal", `${URL}/top`);
    });
  });

  it("return to the homepage", () => {
    visit().then(() => {
      cy.contains("Home").click();
      cy.url().should("equal", `${URL}/`);
    });
  });
});
