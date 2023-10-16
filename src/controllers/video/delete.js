import { 몽구스비디오모델링 } from "../../models/video";

export const 비디오삭제 = async (req, res) => {
  try {
    const id = req.params.id;
    await 몽구스비디오모델링.findOneAndDelete({ _id: id });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
