import { 몽구스데이터모델링 } from "../../models/video";

export const 메인비디오 = async (req, res) => {
  try {
    //* 데이터모델링첫째.find({},) = 전체를 가져오겠다는 뜻. 두번째 parameter로는 콜백함수가 들어옴
    //* render의 video 부분은 모델링의 find를 video라 이름지었기 때문에 video: video 에서 video로 생략이 가능한것.
    const video = await 몽구스데이터모델링.find({}).sort({ createdAt: "desc" });
    return res.render("home", { pageTitle: "Home", video });
  } catch (e) {
    console.log("error Message", e);
  }
};

export const watch = async (req, res) => {
  try {
    const id = req.params.id;
    const 컨텐츠 = await 몽구스데이터모델링.findOne({ _id: id });
    if (!컨텐츠) {
      return res.render("404", { pageTitle: "video is not found!👀" });
    }
    return res.render("watch", {
      pageTitle: 컨텐츠.title,
      video: 컨텐츠,
    });
  } catch (error) {
    console.log(error);
  }
};
