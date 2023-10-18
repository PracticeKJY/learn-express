import fetch from "node-fetch";
import { 몽구스유저모델링 } from "../../models/user";

export const startKaKaoLogin = (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/authorize";
  const config = {
    client_id: process.env.KAKAO_CLIENT_ID,
    redirect_uri: process.env.KAKAO_REDIRECT_URI,
    response_type: "code",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  console.log(finalUrl, "파이널유알엘");
  return res.redirect(finalUrl);
};

export const finishKaKaoLogin = async (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/token";
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_CLIENT_ID,
    client_secret: process.env.KAKAO_CLIENT_SECRET,
    redirect_uri: process.env.KAKAO_REDIRECT_URI,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const data = await fetch(finalUrl, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    // body: {
    //   grant_type: "authorization_code",
    //   client_id: process.env.KAKAO_CLIENT_ID,
    //   client_secret: process.env.KAKAO_CLIENT_SECRET,
    //   redirect_uri: process.env.KAKAO_REDIRECT_URI,
    //   code: "code",
    // },
  });
  const token = await data.json();

  if ("access_token" in token) {
    const { access_token } = token;
    const userRequest = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    const userRequestJson = await userRequest.json();
    const property = userRequestJson.properties;

    const existingUser = await 몽구스유저모델링.findOne({
      username: property.nickname,
    });
    if (existingUser) {
      req.session.loggedIn = true;
      req.session.user = existingUser;
      return res.redirect("/");
    } else {
      const user = await 몽구스유저모델링.create({
        name: property.nickname,
        email: "",
        password: "",
        profileImage: property.profile_image,
        socialOnly: true,
      });
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
    }
  } else {
    return res.redirect("/login");
  }
};

// let user = await 몽구스유저모델링.findOne({  name: property.nickname, });
// if (!user) {
//   user = await 몽구스유저모델링.create({
//      profileImage: property.profile_image,
//     name: property.nickname,
//     email: "",
//     password: "",
//     socialOnly: true,
//   });
//   req.session.loggedIn = true;
//   req.session.user = user;
//   return res.redirect("/");
// }
// } else {
// return res.redirect("/login");
// }
