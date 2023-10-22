import express from "express"

import { postEdit, getEdit } from "../controllers/video/edit"
import { getUpload, postUpload } from "../controllers/video/upload"
import { 비디오삭제 } from "../controllers/video/delete"
import { watch } from "../controllers/video/render"
import {
  세션이있으면넘어가는미들웨어,
  비디오업로드하는미들웨어,
} from "../middlewares"

const videoRouter = express.Router()

//* mongodb _id = 24 byte hexadecimal string (24바이트 16진수) === 정규표현식= ([0-9a-f]{24})
videoRouter.get("/:id([0-9a-f]{24})", watch)

//* 두줄을 하나로 만든것
// videoRouter.get("/:id(\\d+)/edit", 비디오수정);
// videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(세션이있으면넘어가는미들웨어)
  .get(getEdit)
  .post(postEdit)
videoRouter.get(
  "/:id([0-9a-f]{24})/delete",
  세션이있으면넘어가는미들웨어,
  비디오삭제,
)
videoRouter
  .route("/upload")
  .all(세션이있으면넘어가는미들웨어)
  .get(getUpload)
  .post(비디오업로드하는미들웨어.single("video"), postUpload)

export default videoRouter
