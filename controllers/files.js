//Dependencies
const File = require("../models/File");

//Exports
module.exports = {
  //Render profile view
  getProfile: async (req, res) => {
    console.log(req.user);
    try {
      const files = await File.find({ user: req.user.id });
      res.render("profile.ejs", { files: files, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  //Render file view
  getFile: async (req, res) => {
    try {
      const file = await File.findById(req.params.id);
      const code = await File.findById(req.params.code);
      res.render("file.ejs", { file: file, user: req.user, code: code });
    } catch (err) {
      console.log(err);
    }
  },
  //Create file document in database collection
  createFile: async (req, res) => {
    const generateCode = Math.floor(Math.random() * 100000);
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
  //Delete file document from database collection
  deleteFile: async (req, res) => {
    try {
      await File.deleteOne({ _id: req.params.id });
      console.log("Deleted file");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
};
