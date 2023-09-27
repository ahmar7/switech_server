const app = require("./app");
// Environment file set
const dotnet = require("dotenv");
dotnet.config({ path: "./config/config.env" });
const { errorMiddleware } = require("./middlewares/errorMiddleware");
// Database connect
const cloudinary = require("cloudinary");
const database = require("./config/database");
database();
let port = process.env.PORT || 5000;
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});
app.use(errorMiddleware);
let server = app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

// Unhandled promise rejection like if the db server error, it will shutdown the server

// process.on("unhandledRejection", (err) => {
//   console.log("Error: ", err.message);
//   console.log("Shutting down the server due to Unhandled Promise Rejection");
//   server.close(() => {
//     process.exit();
//   });
// });
