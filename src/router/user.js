import express from "express";
import { see } from "../controllers/user";
import {
  finishKaKaoLogin,
  startKaKaoLogin,
} from "../controllers/user/sosialLogin";
import { logout } from "../controllers/user/logout";
import { getEdit, postEdit } from "../controllers/user/edit";
const userRouter = express.Router();

// :id 가 맨 위에있으면 , /edit, /remove ... 들의 명칭도 다 :id 로 인식해서 see 의 콜백함수가 발동!
// => 하위에 코드를 넣으면 정상적으로 라우터가 동작함 , 혹은 :id 는 숫자라고 조건을 걸면 될거같은데.. 원래같으면 if절할거같은데 맞냐?
// => 강의에서는 정규식으로 표현을 함 "/:id(\\d+) 이런식으로!

userRouter.get("/:id(\\d+)", see);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/logout", logout);

// 소셜로그인
userRouter.get("/kakao/start", startKaKaoLogin);
userRouter.get("/kakao/finish", finishKaKaoLogin);

export default userRouter;
