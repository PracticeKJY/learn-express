import express from "express";
// import { 메인비디오, 비디오검색 } from "../controllers/video";
import { 메인비디오 } from "../controllers/video/render";
import { 비디오검색 } from "../controllers/video/search";
import { join, login } from "../controllers/user";

const globalRouter = express.Router();

globalRouter.get("/", 메인비디오);
globalRouter.get("/join", join);
globalRouter.get("/search", 비디오검색);
globalRouter.get("/login", login);

export default globalRouter;
