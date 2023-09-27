const express = require("express");

const { isAuthorizedUser, authorizedRoles } = require("../middlewares/auth");
const {
  addAbout,
  updateAbout,
  getHomeAbout,
} = require("../controllers/HomeController/aboutController");
const {
  addInformation,
  getInformation,
  updateInformation,
} = require("../controllers/informationController");

let router = express.Router();
router
  .route("/updateHomeAbout")
  .patch(isAuthorizedUser, authorizedRoles("admin"), updateAbout);
router
  .route("/addInformation")
  .patch(isAuthorizedUser, authorizedRoles("admin"), updateInformation);
router.route("/getHomeAbout").get(getHomeAbout);
router.route("/getInformation").get(getInformation);

// poduct controller route

module.exports = router;
