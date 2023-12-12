const express = require("express");
const { isLogin } = require("../middlewares/auth");
const {
  handleUserRegister,
  renderRegisterPage,
  renderLoginPage,
  handleUserLogin,
  handleUserLogout,
} = require("../controller/user");

const router = express.Router();

router.route("/signup").get(renderRegisterPage).post(handleUserRegister);
router.route("/login").get(isLogin, renderLoginPage).post(handleUserLogin);
router.get("/logout", handleUserLogout);

module.exports = router;
