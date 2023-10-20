import express from "express";
import {
  finishKaKaoLogin,
  startKaKaoLogin,
} from "../controllers/user/sosialLogin";
import { logout } from "../controllers/user/logout";
import {
  getChangePassword,
  getEdit,
  postChangePassword,
  postEdit,
} from "../controllers/user/edit";
import {
  세션이있으면넘어가는미들웨어,
  세션이없으면넘어가는미들웨어,
  파일업로드하는미들웨어,
} from "../middlewares";
import { see } from "../controllers/user/see";
const userRouter = express.Router();

userRouter
  .route("/edit")
  .all(세션이있으면넘어가는미들웨어)
  .get(getEdit)
  .post(파일업로드하는미들웨어.single("avatar"), postEdit);
userRouter.get("/logout", logout);

//* 소셜로그인
userRouter.get("/kakao/start", 세션이없으면넘어가는미들웨어, startKaKaoLogin);
userRouter.get("/kakao/finish", 세션이없으면넘어가는미들웨어, finishKaKaoLogin);

//* 패스워드 변경
userRouter
  .route("/change-password")
  .all(세션이있으면넘어가는미들웨어)
  .get(getChangePassword)
  .post(postChangePassword);

//* :id 가 맨 위에있으면 , /edit, /remove ... 들의 명칭도 다 :id 로 인식해서 see 의 콜백함수가 발동!
//* => 하위에 코드를 넣으면 정상적으로 라우터가 동작함 , 혹은 :id 는 숫자라고 조건을 걸면 될거같은데.. 원래같으면 if절할거같은데 맞냐?
//* => 강의에서는 정규식으로 표현을 함 "/:id(\\d+) 이런식으로!

userRouter.get("/:id", see);

export default userRouter;
