import { 몽구스유저모델링 } from "../../models/user"
import { 몽구스비디오모델링 } from "../../models/video"

export const see = async (req, res) => {
  const id = req.params.id
  const user = await 몽구스유저모델링.findById(id).populate({
    path: "videos",
    populate: {
      path: "owner",
      model: "User",
    },
  })
  // const videos = await 몽구스비디오모델링.find({ owner: user._id });
  //! 예외. 유저가 없을 때
  if (!user) {
    return res.status(400).render("404", {
      pageTitle: "User not found",
    })
  }
  return res.render("users/profile", {
    pageTitle: user.name,
    user,
  })
}
