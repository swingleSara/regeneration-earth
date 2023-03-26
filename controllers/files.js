//Dependencies
const File = require("../models/File");

//Exports
module.exports = {
  //Render profile view
  getProfile: async (req, res) => {
    try {
      const files = await File.find({ user: req.user.id }).lean();
      let arrOfFiles = files.slice(0);
      arrOfFiles.sort((a, b) => {
        const result = a.lastName.localeCompare(b.lastName);
        return result !== 0 ? result : a.firstName.localeCompare(b.firstName);
      });
      res.render("profile.ejs", { files: arrOfFiles });
    } catch (err) {
      console.log(err);
    }
  },
  //Render client view
  getClient: async (req, res) => {
    try {
      const pair = await File.findOne({
        code: req.query.code,
        word: req.query.word,
      });
      res.render("client.ejs", { pair: pair });
    } catch (err) {
      console.log(err);
    }
  },

  //Create file document in database collection
  createFile: async (req, res) => {
    const generateCode = Math.floor(Math.random() * 100000);
    try {
      await File.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        link: req.body.link,
        code: generateCode,
        user: req.user.id,
        word: req.body.word,
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
