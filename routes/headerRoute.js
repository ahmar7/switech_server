const express = require("express");

const singleUpload = require("../middlewares/multer");
const { isAuthorizedUser, authorizedRoles } = require("../middlewares/auth");
const {
  addHeader,
  getHeader,
  postHeader,
} = require("../controllers/headerController");
let router = express.Router();
router
  .route("/addHeader")
  .patch(isAuthorizedUser, authorizedRoles("admin"), singleUpload, addHeader);
router.route("/getHeader").get(getHeader);
// poduct controller route

module.exports = router;
