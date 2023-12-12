const express = require("express");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv").config();
const cookieSession = require("cookie-session");

const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const isUserAuthenticated = require("./middlewares/auth");

const app = express();
const PORT = process.env.PORT || 9897;

function convertTimeToUTC530(maxAgeMinutes){
  const maxAgeMilliseconds = maxAgeMinutes * 60 * 1000;
  return maxAgeMilliseconds;
}

// Connection
require("./model");

// Cookie-session
app.use(cookieSession({
  name: "AIS-Session",
  keys: [process.env.SECRET],
  maxAge: convertTimeToUTC530(5)
}));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Set the view engine
app.set("view engine", "html");

// Configuration of nunjucks
nunjucks.configure("view", {
  autoescape: true,
  express: app,
});

// Router
app.use("/user", userRouter);
app.use("/", productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});