const express = require("express");

const singleUpload = require("../middlewares/multer");
const { isAuthorizedUser, authorizedRoles } = require("../middlewares/auth");
const {
  addSocialLink,
  addSocialFeature,
  getSocialLink,
  getSocialFeature,
} = require("../controllers/Footer/socialLinkController");

let router = express.Router();
router
  .route("/addSocial")
  .patch(
    isAuthorizedUser,
    authorizedRoles("admin"),
    singleUpload,
    addSocialLink
  );
router
  .route("/addSocialFeature")
  .patch(
    isAuthorizedUser,
    authorizedRoles("admin"),
    singleUpload,
    addSocialFeature
  );
router.route("/getSocialLinks").get(getSocialLink);
router.route("/getSocialFeature").get(getSocialFeature);

// poduct controller route

module.exports = router;
