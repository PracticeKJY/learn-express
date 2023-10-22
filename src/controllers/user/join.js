import { 몽구스유저모델링 } from "../../models/user"

export const getJoin = (req, res) => {
  return res.render("createAccount", { pageTitle: "계정 만들기" })
}

//! multer을 사용하려면 라우터에 multer()를 미들웨어로 post 보내야됨
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body

  if (req.file) {
    const avatarUrl = req.file.path
  }

  const pageTitle = "Join"
  if (password !== password2) {
    return res.render("createAccount", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    })
  }
  const exists = await 몽구스유저모델링.exists({
    $or: [{ username }, { email }],
  })
  if (exists) {
    return res.render("createAccount", {
      pageTitle,
      errorMessage: "This username/email is already taken.",
    })
  }

  await 몽구스유저모델링.create({
    name,
    avatarUrl: "",
    username,
    email,
    password,
    location,
  })
  return res.redirect("/login")
}
