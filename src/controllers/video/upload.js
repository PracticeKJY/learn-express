import { 몽구스비디오모델링 } from "../../models/video";

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "업로드 비디오쓰" });

export const postUpload = async (req, res) => {
  try {
    const { title, description, hashtags } = req.body;
    await 몽구스비디오모델링.create({
      title,
      description,
      hashtags: 몽구스비디오모델링.formatHashtags(hashtags),
    });
    //* db에 저장쓰 변수로빼서 비동기통신 + 변수.save() 의 조합도있지만 애초에 모델링.create({스키마들})을 통한 방법도 있음
    //* const videoDataBase = await video.save();
    return res.redirect("/");
  } catch (error) {
    console.log("에러메세지 : ", error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
