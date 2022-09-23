import {
  CreateRecommendationData,
  recommendationService,
} from "../../src/services/recommendationsService";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { fullVideoBody, uniqueVideoBody } from "../factories/factory";
import { conflictError, notFoundError } from "../../src/utils/errorUtils";

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
          ...fullVideoBody(data),
        };
      });
    const promise = recommendationService.insert(data);
    await expect(promise).rejects.toEqual(
      conflictError("Recommendations names must be unique")
    );
    expect(recommendationRepository.create).not.toBeCalled();
  });

  it("mock a succesful upvote", async () => {
    const id = 1;
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return {
          ...fullVideoBody(),
        };
      });
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return {
          ...fullVideoBody(),
          score: fullVideoBody().score + 1,
        };
      });

    await recommendationService.upvote(id);
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
    // await expect(callback).rejects.toEqual(notFoundError());
  });

  it("mock a failed upvote", async () => {
    const id = 1;
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => null);
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return {
          ...fullVideoBody(),
          score: fullVideoBody().score + 1,
        };
      });

    const promise = recommendationService.upvote(id);
    expect(recommendationRepository.find).toBeCalled();
    await expect(promise).rejects.toEqual(notFoundError());
    // expect(recommendationRepository.updateScore).toBeCalled();
  });

  it("mock a succesful downvote with deletion", async () => {
    const id = 1;
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return {
          ...fullVideoBody(),
        };
      });
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return {
          ...fullVideoBody(),
          score: fullVideoBody().score + 1,
        };
      });

    await recommendationService.downvote(id);
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
    // await expect(callback).rejects.toEqual(notFoundError());
  });
});
