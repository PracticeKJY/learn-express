import express from "express";
// import { 메인비디오, 비디오검색 } from "../controllers/video";
import { 메인비디오 } from "../controllers/video/render";
import { 비디오검색 } from "../controllers/video/search";
import { getLogin, postLogin } from "../controllers/user/sign";
import { getJoin, postJoin } from "../controllers/user/join";

const rootRouter = express.Router();

rootRouter.get("/", 메인비디오);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", 비디오검색);

export default rootRouter;
