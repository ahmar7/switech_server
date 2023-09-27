const express = require("express");

const singleUpload = require("../middlewares/multer");
const { isAuthorizedUser, authorizedRoles } = require("../middlewares/auth");
const {
  addBannerSlider,
  getSlider,
} = require("../controllers/HomeController/bannerSliderController");
const {
  belowBanner,
  getBelowBanner,
} = require("../controllers/HomeController/belowBanners");

let router = express.Router();
router
  .route("/addSlider")
  .patch(
    isAuthorizedUser,
    authorizedRoles("admin"),
    singleUpload,
    addBannerSlider
  );
router
  .route("/addBanners")
  .patch(isAuthorizedUser, authorizedRoles("admin"), singleUpload, belowBanner);
router.route("/getBanners").get(getSlider);
router.route("/getBelowBanners").get(getBelowBanner);

// poduct controller route

module.exports = router;
