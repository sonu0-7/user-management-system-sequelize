const {models} = require("../model");
const bcrypt = require("bcrypt");
const {userJoiSchema} = require("../model/validation/user");

const User = models.USER;
async function handleUserRegister(req, res) {
  try {
    const { name, email, password } = req.body;
    let {error, value} = await userJoiSchema.validate({name, email, password});
    if(error) {
      const errorDetails = error.details.map((d)=> d.message).join("<br>");
      res.send("<script>alert('"+ errorDetails +"'); history.back();</script>");
      return;
    }
    let hashPassword = await bcrypt.hash(password, 10);
    value.password = hashPassword;
    const newUser = await User.build(value);
    await newUser.save();
    if(newUser) return res.redirect("/user/login");
  } catch (error) {
    return res.redirect("/user/signup");
  }
}

function renderRegisterPage(req, res) {
  return res.render("signup");
}

async function renderLoginPage(req, res) {
  return res.render("login");
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    var user = await User.findOne({where: {email}});
    user = user.dataValues;
    const isValidUser = await bcrypt.compare(password, user.password);
    if(isValidUser) {
      req.session.user = user;
    }
    if (!user) return res.render("login", { error: "Invalid email or password" });
    return res.redirect("/");
  } catch (error) {
    res.end("Oops! user don't exist");
  }
}

async function handleUserLogout(req, res){
  req.session = null;
  res.redirect("/user/login");
}

module.exports = {
  handleUserRegister,
  renderRegisterPage,
  renderLoginPage,
  handleUserLogin,
  handleUserLogout,
};