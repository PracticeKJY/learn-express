import express from "express";
import {
  postEdit,
  비디오수정,
  비디오업로드,
  비디오삭제,
  see,
} from "../controllers/video";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", see);
// 두줄을 하나로 만든것
// videoRouter.get("/:id(\\d+)/edit", 비디오수정);
// videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter.route("/:id(\\d+)/edit").get(비디오수정).post(postEdit);
videoRouter.get("/:id(\\d+)/delete", 비디오삭제);
videoRouter.get("/upload", 비디오업로드);

export default videoRouter;
