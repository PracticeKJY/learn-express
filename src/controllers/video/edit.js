import { 몽구스비디오모델링 } from "../../models/video";

export const getEdit = async (req, res) => {
  const id = req.params.id;
  const 컨텐츠 = await 몽구스비디오모델링.findOne({ _id: id });
  if (!컨텐츠) {
    return res.render("404", { pageTitle: "video is not found!👀" });
  }
  return res.render("edit", {
    pageTitle: `Editing: `,
    video: 컨텐츠,
  });
};

export const postEdit = async (req, res) => {
  const id = req.params.id;
  const { title, description, hashtags } = req.body;
  const 컨텐츠 = await 몽구스비디오모델링.findOne({ _id: id });
  if (!컨텐츠) {
    return res.render("404", { pageTitle: "video is not found!👀" });
  }
  await 몽구스비디오모델링.findOneAndUpdate(
    { _id: id },
    {
      title,
      description,
      hashtags: 몽구스비디오모델링.formatHashtags(hashtags),
    }
  );

  return res.redirect(`/videos/${id}`);
};
