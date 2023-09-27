const express = require("express");
const app = express();
app.use(express.json());
let cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
app.use(cookieParser());

const cors = require("cors");
app.use(
  cors({
    origin: process.env.CORS_URL,
    credentials: true,
  })
);

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
// All Routes
// const product = require("./routes/productRoute");
const header = require("./routes/headerRoute");
const user = require("./routes/userRoute");
const bannerSlider = require("./routes/bannerSliderRoute");
const homeAbout = require("./routes/HomeAboutRoute");
const footer = require("./routes/footerRoute");
const miscellaneous = require("./routes/MiscellaneousRoute");
app.use("/api/v1", user);
app.use("/api/v1", header);
app.use("/api/v1", bannerSlider);
app.use("/api/v1", homeAbout);
app.use("/api/v1", footer);
app.use("/api/v1", miscellaneous);

module.exports = app;
