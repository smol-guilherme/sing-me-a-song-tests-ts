import { truncateData } from "../repositories/testRepository";

export async function dataReset() {
  return truncateData();
}
