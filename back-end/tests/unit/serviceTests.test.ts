import {
  CreateRecommendationData,
  recommendationService,
} from "../../src/services/recommendationsService";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { uniqueVideoBody } from "../factories/factory";
import { conflictError } from "../../src/utils/errorUtils";

beforeEach(async () => {
  jest.resetAllMocks();
});

describe("recommendation services unit tests", () => {
  it("mock a succesful insertion", async () => {
    const data = uniqueVideoBody();
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValueOnce(null);
    jest.spyOn(recommendationRepository, "create").mockResolvedValueOnce();

    await recommendationService.insert(data);
    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.create).toBeCalled();
  });

  it("mock a failed insertion", async () => {
    const data: CreateRecommendationData = uniqueVideoBody();
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {
        return {
          id: 1,
          ...data,
          score: 10,
        };
      });

    const callback = recommendationService.insert(data);
    await expect(callback).rejects.toEqual(
      conflictError("Recommendations names must be unique")
    );
    expect(recommendationRepository.create).not.toBeCalled();
  });
});
