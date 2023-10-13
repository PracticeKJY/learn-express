export const edit = (req, res) => res.send("유저정보수정^V^");
export const join = (req, res) => res.send("쪼인유저정보쓰^V^");

export const remove = (req, res) => res.send("유저정보삭제^V^");
export const login = (req, res) => res.send("로그인^V^");
export const logout = (req, res) => res.send("로그아웃^V^");
export const see = (req, res) => {
  console.log("params ID :", req.params.id);
  res.send("유저 보기 3.3");
};
