import { 몽구스비디오모델링 } from "../../models/video"

export const getRegisterView = (req, res) =>
  res.render("views", { pageTitle: "뷰페이지" })

export const registerView = async (req, res) => {
  const count = req.body.playCount
  console.log(req.body)
  console.log(req.params)
  const id = req.params.id
  const video = await 몽구스비디오모델링.findOne({ _id: id })
  // ! 예외. 동영상이 없을 때 404페이지 리턴
  if (!video) {
    return res.sendStatus(404)
  }
  console.log("메타뷰1 : ", video.meta.views)
  console.log("카운트 : ", count)
  video.meta.views = video.meta.views + 1
  console.log("메타뷰2 : ", video.meta.views)
  await video.save()
  return res.sendStatus(200)
}
