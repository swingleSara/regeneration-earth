//Dependencies
const Client = require("../models/Client");

//Exports
module.exports = {
  //Render profile view
  getProfile: async (req, res) => {
    try {
      const clients = await Client.find({ user: req.user.id }).lean();
      let arrOfClients = clients.slice(0);
      arrOfClients.sort((a, b) => {
        const result = a.lastName.localeCompare(b.lastName);
        return result !== 0 ? result : a.firstName.localeCompare(b.firstName);
      });
      res.render("profile.ejs", { clients: arrOfclients });
    } catch (err) {
      console.log(err);
    }
  },
  //Render client view
  getClient: async (req, res) => {
    try {
      const pair = await Client.findOne({
        code: req.query.code,
        word: req.query.word,
      });
      res.render("client.ejs", { pair: pair });
    } catch (err) {
      console.log(err);
    }
  },
  // //Render file view
  // getFile: async (req, res) => {
  //   try {
  //     const file = await File.findById(req.params.id);
  //     const link = await File.findById(req.params.link);
  //     const code = await File.findById(req.params.code);
  //     const word = await File.findById(req.params.word);
  //     res.render("file.ejs", {
  //       file: file,
  //       user: req.user,
  //       link: link,
  //       code: code,
  //       word: word,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  //Create client document in database collection
  createClient: async (req, res) => {
    const generateCode = Math.floor(Math.random() * 100000);
    try {
      await Client.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        link: req.body.link,
        code: generateCode,
        user: req.user.id,
        word: req.body.word,
      });
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  //Delete client document from database collection
  deleteClient: async (req, res) => {
    try {
      await Client.deleteOne({ _id: req.params.id });
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
};
