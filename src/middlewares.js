import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user;

  next();
};

export const 세션이있으면넘어가는미들웨어 = (req, res, next) => {
  if (req.session.loggedIn) {
    console.log("나 작동하는중");
    next();
  } else {
    return res.redirect("/login");
  }
};

export const 세션이없으면넘어가는미들웨어 = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

// multer()을 이용한 파일 업로드.
// 안의 arg로는 dest(파일경로)를 받음. 추가적인 속성에 대해서는 공식문서 참고
// ! https://github.com/expressjs/multer#readme
export const 파일업로드하는미들웨어 = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000,
  },
});

export const 비디오업로드하는미들웨어 = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 10000000,
  },
});
