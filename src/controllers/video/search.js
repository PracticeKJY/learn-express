import { 몽구스비디오모델링 } from "../../models/video"

export const 비디오검색 = async (req, res) => {
  const { keyword } = req.query
  console.log(keyword, "키워드")
  let videos = []
  if (keyword) {
    videos = await 몽구스비디오모델링
      .find({
        title: {
          $regex: new RegExp(keyword, "i"),
        },
      })
      .populate("owner")
  }

  return res.render("search", { pageTitle: "검 색🧐", video: videos })
}
