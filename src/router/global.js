import express from "express";
// import { 메인비디오, 비디오검색 } from "../controllers/video";
import { 메인비디오 } from "../controllers/video/render";
import { 비디오검색 } from "../controllers/video/search";
import { getLogin, postLogin } from "../controllers/user/sign";
import { getJoin, postJoin } from "../controllers/user/join";
import {
  세션이없으면넘어가는미들웨어,
  파일업로드하는미들웨어,
} from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", 메인비디오);
rootRouter
  .route("/join")
  .all(세션이없으면넘어가는미들웨어)
  .get(getJoin)
  .post(파일업로드하는미들웨어.single("avatar"), postJoin);
rootRouter
  .route("/login")
  .all(세션이없으면넘어가는미들웨어)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/search", 비디오검색);

export default rootRouter;
