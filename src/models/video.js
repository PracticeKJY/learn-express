// mongoose에게 데이터들의 스키마들을 지정해줘야함

import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

export const 데이터모델링첫째 = mongoose.model("데이터모델링첫째", videoSchema);

// const video = {
//   title: "뿌앵뿌앵 갱얼쥐",
//   description: "뿌앵뿌앵",
//   createdAt: 231013,
//   hashtags: ["#동물", "#쏘뀻"],
// };
