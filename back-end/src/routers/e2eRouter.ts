import { Router } from "express";
import { reset } from "../controllers/testController";

const testRouter = Router();

testRouter.post("/reset", reset);

export default testRouter;
