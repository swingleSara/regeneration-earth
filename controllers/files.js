const File = require("../models/File");

module.exports = {
  getProfile: async (req, res) => {
    console.log(req.user);
    try {
      const files = await File.find({ user: req.user.id });
      res.render("profile.ejs", { files: files, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFile: async (req, res) => {
    try {
      const file = await File.findById(req.params.id);
      res.render("file.ejs", { file: file, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createFile: async (req, res) => {
    const generateCode = Math.floor(Math.random() * 1000000);
    try {
      await File.create({
        client: req.body.client,
        link: req.body.link,
        code: generateCode,
        user: req.user.id,
      });
      console.log("Link has been added and a code created!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  deleteFile: async (req, res) => {
    try {
      await File.remove({ _id: req.params.id });
      console.log("Deleted file");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
