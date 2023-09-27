let express = require("express");
const {
  RegisterUser,
  loginUser,
  logoutUser,
  updateProfile,
  getProfile,
  updatePassword,
} = require("../controllers/userController");

const { isAuthorizedUser, authorizedRoles } = require("../middlewares/auth");
let router = express.Router();

router.route("/register").post(RegisterUser);

router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/auth").get(isAuthorizedUser, authorizedRoles("admin"));
router
  .route("/update-password")
  .post(isAuthorizedUser, authorizedRoles("admin"), updatePassword);
router
  .route("/update-profile")
  .get(isAuthorizedUser, authorizedRoles("admin"), getProfile)
  .post(isAuthorizedUser, authorizedRoles("admin"), updateProfile);

module.exports = router;
