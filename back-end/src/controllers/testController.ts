import { Request, Response } from "express";
import { dataReset } from "../services/testService";

export async function reset(req: Request, res: Response) {
  await dataReset();

  res.status(204).send();
  return;
}
