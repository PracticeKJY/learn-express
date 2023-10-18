export const getEdit = (req, res) => {
  return res.render("edit-profile", {
    pageTitle: "Edit Profile",
  });
};

export const postEdit = (req, res) => {
  return res.render("edit-profile");
};
