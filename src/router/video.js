import express from "express";

import { postEdit, getEdit } from "../controllers/video/edit";
import { getUpload, postUpload } from "../controllers/video/upload";
import { 비디오삭제 } from "../controllers/video/delete";
import { watch } from "../controllers/video/render";

const videoRouter = express.Router();

//* mongodb _id = 24 byte hexadecimal string (24바이트 16진수) === 정규표현식= ([0-9a-f]{24})
videoRouter.get("/:id([0-9a-f]{24})", watch);

//* 두줄을 하나로 만든것
// videoRouter.get("/:id(\\d+)/edit", 비디오수정);
// videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", 비디오삭제);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;
