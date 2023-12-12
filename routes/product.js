const express = require("express");
const {
  handleHomePage,
  createProduct,
  deleteProduct,
  editProduct,
} = require("../controller/product");
const { isUserAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.get("/", isUserAuthenticated, handleHomePage);
router.post("/product", createProduct);
router.get("/product/delete", deleteProduct);
router.post("/product/edit/:productId", editProduct);

module.exports = router;