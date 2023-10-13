import { 데이터모델링첫째 } from "../models/video";

export const 메인비디오 = async (req, res) => {
  try {
    // 데이터모델링첫째.find({},) = 전체를 가져오겠다는 뜻. 두번째 parameter로는 콜백함수가 들어옴
    const 테스트 = await 데이터모델링첫째.find({});
    console.log(테스트);
    console.log("양꼬치 꽂아버려");
    return res.render("home", { pageTitle: "Home", video: [] });
  } catch (e) {
    console.log("error Message", e);
  }
};

export const 비디오시청 = (req, res) => res.send("왓치 비디오^V^");
//res.render() 의 인자는 pug 템플릿엔진을 불러옴
export const 비디오수정 = (req, res) => {
  const id = req.params.id;
  return res.render("edit", {
    pageTitle: `Editing: `,
  });
};
export const postEdit = (req, res) => {
  const params = req.params.id;
  console.log(req.body, "왓칭 핫바디😘");
  video[params - 1].title = req.body.title;
  return res.redirect(`/videos/${params}`);
};
export const 비디오검색 = (req, res) => res.send("비디오를 검색합니다 @ V @");
export const 비디오삭제 = (req, res) => res.send("비디오를 삭제합니다 XX");
export const 비디오업로드 = (req, res) =>
  res.send("비디오를 업로드합니다 ^V^b");

export const see = (req, res) => {
  const id = req.params.id;
  return res.render("watch", {
    pageTitle: `watch`,
  });
};
