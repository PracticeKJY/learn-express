// mongoose에게 데이터들의 스키마들을 지정해줘야함

import mongoose from "mongoose";

const date = new Date();
const options = { timeZone: "Asia/Seoul" };
const koreanTime = date.toLocaleString("ko-KR", options);

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // createdAt: { type: Date, required: true, default: Date.now },
  fileUrl: { type: String, required: true },
  createdAt: { type: String, required: true, default: koreanTime },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

//* middleWare
//* 스키마.pre()를 통해 데이터모델링.create()의 로직을 아래코드처럼 간추릴 수 있음
//*     await 몽구스비디오모델링.create({
//*   title,
//*   description,
//*   hashtags,   (원래는 hashtags에 아래로직들의 코드들이 post DB controller마다 적용되어있었음.)
//* });
// videoSchema.pre("save", async function () {
//   this.hashtags = this.hashtags[0]
//     .split(",")
//     .map((word) => (word.startsWith("#") ? word : `#${word}`));
// });

//* 이외에도 스키마.static() 도 있는데 이건 함수를 담는 바구니 느낌!
//* 단순히 함수를 생성해서 export 하는거랑 같지만 확장성이 나름 좋음
//* 소스코드
const 스태틱콜백함수 = (hashtags) => {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
};
videoSchema.static("formatHashtags", 스태틱콜백함수);

//* 첫번째 arg로는 db에 저장될 컬렉션의 이름 , 2번째 arg로는 data의 schema
export const 몽구스비디오모델링 = mongoose.model("Video", videoSchema);
