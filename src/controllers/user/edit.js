import { 몽구스유저모델링 } from "../../models/user";
import bcrypt from "bcrypt";

export const getEdit = (req, res) => {
  return res.render("edit-profile", {
    pageTitle: "Edit Profile",
  });
};

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, email, username, location },
    file,
  } = req;

  //TODO 테스트 1
  //TODO  session의 property로 아래의 코드를 넣어야됨
  //TODO user: { _id, email: sessionEmail, username: sessionUsername },
  // const 이메일로디비조회 = await 몽구스유저모델링.find({
  //   // $or: [{ username }, { email }],
  //   email,
  // });

  // if (sessionEmail === email) {
  //   return res.render("edit-profile", {
  //     pageTitle: "Edit Profile",
  //     errorMessage: "똑같은 이메일을 작성했어요. ",
  //   });
  // }

  // if (이메일로디비조회[0]?.email === email) {
  //   return res.render("edit-profile", {
  //     pageTitle: "Edit Profile",
  //     errorMessage: "중복된 이메일이 존재해요.",
  //   });
  // }

  //TODO 이게 더 좋은 코드인거같아. 더 짧고 직관성도 나쁘지 않으니깐요
  const currentUser = req.session.user;
  // 중복 이메일 체크
  if (
    currentUser.email !== email &&
    (await 몽구스유저모델링.exists({ email }))
  ) {
    return res.status(400).render("edit-profile", {
      pageTitle: "Edit profile",
      errorMessage: "This email is already taken.",
    });
  }

  // 중복 유저이름 체크
  if (
    currentUser.username !== username &&
    (await 몽구스유저모델링.exists({ username }))
  ) {
    return res.status(400).render("edit-profile", {
      pageTitle: "Edit profile",
      errorMessage: "This username is already taken.",
    });
  }

  const updatedUser = await 몽구스유저모델링.findByIdAndUpdate(
    _id,
    {
      //* file의 존재 유무에 따라 변경된 파일을 넣을건지, 기존의 파일을 쓸건지 정함
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      username,
      location,
    },
    { new: true }
  );

  console.log(updatedUser, "업데이트유저");

  //* db 업데이트에 대한 세션 최신화 , 세션 최신화 = 렌더링 최신화
  req.session.user = updatedUser;
  return res.redirect("/users/edit");
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly) {
    return res.redirect("/");
  }
  return res.render("change-password", { pageTitle: "비밀번호 변경" });
};

export const postChangePassword = async (req, res) => {
  // 구조분해할당
  const {
    session: {
      user: { _id },
    },
    body: { currentPassword, newPassword, newPasswordConfirm },
  } = req;
  const user = await 몽구스유저모델링.findOne({ _id });

  // ? bcrypt.compare ?비밀번호 해싱 알고리즘인 bcrypt를 사용하여 저장된 해시된 비밀번호와 입력된 비밀번호를 비교하는 함수
  const 해쉬된비밀번호일치여부 = await bcrypt.compare(
    currentPassword,
    user.password
  );

  // ! 예외. 현재 비밀번호가 일치하지 않은 경우
  if (!해쉬된비밀번호일치여부) {
    return res.status(400).render("change-password", {
      pageTitle: "비밀번호 변경",
      errorMessage: "현재 비밀번호가 일치하지 않습니다.",
    });
  }
  // ! 예외. 변경한 비밀번호와 변경 비밀번호확인이 일치하지 않은 경우
  if (newPassword !== newPasswordConfirm) {
    return res.status(400).render("change-password", {
      pageTitle: "비밀번호 변경",
      errorMessage: "새로운 비밀번호가 서로 일치하지 않습니다.",
    });
  }
  user.password = newPassword;
  // * .save()를 통해 전체 변경값만 업데이트해서 저장해줌.
  await user.save();
  //* 저장 이후 자동 로그아웃되도록 설계
  return res.redirect("/users/logout");
};
