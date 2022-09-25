import "dotenv/config";

describe("E2E tests", () => {
  const visit = () => cy.visit(process.env.REACT_APP_API_BASE_URL);
  it("succeeds on inserting a new video entry", async () => {
    visit();

    cy.contains("Name").type("Tacica song slaps");
    cy.contains("https://youtu.be/ ...").type(
      "https://www.youtube.com/watch?v=fu2QzRY8IUI"
    );
    cy.intercept("POST", "/recommendations").as("postRecs");
    cy.wait("@postRec");
    cy.contains("煌々").should("be.visible");
  });
});
