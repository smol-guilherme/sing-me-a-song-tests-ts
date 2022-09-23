import { recommendationService } from "../../src/services/recommendationsService";

describe("recommendation services unit tests", () => {
  it("mock a succesful insertion", async () => {
    jest
      .spyOn(recommendationService, "insert")
      .mockImplementationOnce(() => Promise.resolve());
  });
});
