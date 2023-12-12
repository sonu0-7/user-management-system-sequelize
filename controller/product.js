const { models } = require("../model");
const Product = models.PRODUCT;

async function handleHomePage(req, res) {
  try {
    const { id, name } = req.session.user;
    const allProducts = await Product.findAll({ where: { user_id: id } });
    // console.log("allProducts -->", allProducts );
    return res.render("home", { products: allProducts, name });
  } catch (error) {
    return res.render("home");
  }
}

async function createProduct(req, res) {
  try {
    const user_id = req.session.user.id;
    const { title, name, price, quantity } = req.body;
    const product = await Product.build({
      title,
      name,
      price,
      quantity,
      user_id,
    });
    await product.save();
    if (!product) res.status(400).json({ Err: "Error product hasn't created" });
    return res.redirect("/");
  } catch (error) {
    return res.end("Something went wrong...");
  }
}

async function deleteProduct(req, res) {
  try {
    const productId = req.query.productId;
    const deletedProduct = await Product.destroy({ where: { id: productId } });
    return res.redirect("/");
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    return res.status(500).end("Something went wrong...");
  }
}

async function editProduct(req, res) {
  try {
    const productId = req.params.productId;
    const { title, name, price, quantity } = req.body;
    const updateProduct = await Product.update(
      { title, name, price, quantity },
      { where: { id: productId } }
    );
    return res.redirect("/");
  } catch (error) {}
}

module.exports = {
  handleHomePage,
  createProduct,
  deleteProduct,
  editProduct,
};