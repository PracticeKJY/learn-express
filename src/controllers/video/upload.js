import { 몽구스유저모델링 } from "../../models/user";
import { 몽구스비디오모델링 } from "../../models/video";

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "업로드 비디오쓰" });

export const postUpload = async (req, res) => {
  try {
    const { _id } = req.session.user;
    const fileUrl = req.file.path;
    const { title, description, hashtags } = req.body;
    const newVideo = await 몽구스비디오모델링.create({
      title,
      description,
      owner: _id,
      fileUrl,
      hashtags: 몽구스비디오모델링.formatHashtags(hashtags),
    });
    //* db에 저장쓰 변수로빼서 비동기통신 + 변수.save() 의 조합도있지만 애초에 모델링.create({스키마들})을 통한 방법도 있음
    //* const videoDataBase = await video.save();

    // TODO 몽구스유저모델링의 videos에 한 계정이 올린 비디오들의 리스트들을 얻기 위해서 업로드할 때 videos라는 키에 id들을 적립시킴.
    // TODO videos에는 대충 [video1_id, video2_id.... ] 이런식의 배열이 쌓임
    const user = await 몽구스유저모델링.findById(_id);
    // if (!user.videos) {
    //   Object.assign(user, { videos: [] });
    // }
    // console.log(user.videos, "유저");
    // user.videos.push(newVideo._id);
    // console.log(newVideo, "뉴비");
    // user.save();

    return res.redirect("/");
  } catch (error) {
    console.log("에러메세지 : ", error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
