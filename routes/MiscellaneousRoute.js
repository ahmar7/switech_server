const express = require("express");

const singleUpload = require("../middlewares/multer");
const { isAuthorizedUser, authorizedRoles } = require("../middlewares/auth");

const {
  addMiscBanner,
  getMiscBanner,
} = require("../controllers/Miscellaneous/BannerController");
const {
  addMiscProduct,
  miscProductDetails,
  miscUpdateProduct,

  getMiscAllProducts,
  miscDeleteProduct,
} = require("../controllers/Miscellaneous/productController");
const {
  addLandBanner,
  getLandBanner,
} = require("../controllers/LandPage/BannerController");
const {
  addLandProduct,

  getLandAllProducts,
  landProductDetails,
  landUpdateProduct,
  landDeleteProduct,
} = require("../controllers/LandPage/productController");

let router = express.Router();
router
  .route("/updateMiscBanner")
  .patch(
    isAuthorizedUser,
    authorizedRoles("admin"),
    singleUpload,
    addMiscBanner
  );
router.route("/getLandBanner").get(getLandBanner);
router
  .route("/updateLandBanner")
  .patch(
    isAuthorizedUser,
    authorizedRoles("admin"),
    singleUpload,
    addLandBanner
  );
router.route("/getMiscBanner").get(getMiscBanner);

// poduct controller route
router
  .route("/addMiscProduct")
  .post(
    isAuthorizedUser,
    authorizedRoles("admin"),
    singleUpload,
    addMiscProduct
  );
router
  .route("/addLandProduct")
  .post(
    isAuthorizedUser,
    authorizedRoles("admin"),
    singleUpload,
    addLandProduct
  );
router.route("/getMiscProducts").get(getMiscAllProducts);
router.route("/getLandProducts").get(getLandAllProducts);
router.route("/getMiscProducts/:id").get(miscProductDetails);
router
  .route("/updateMiscProducts/:id")
  .put(
    isAuthorizedUser,
    authorizedRoles("admin"),
    singleUpload,
    miscUpdateProduct
  );
router
  .route("/product/:id")
  .delete(isAuthorizedUser, authorizedRoles("admin"), miscDeleteProduct);

router.route("/getLandProducts/:id").get(landProductDetails);
router
  .route("/updateLandProducts/:id")
  .put(
    isAuthorizedUser,
    authorizedRoles("admin"),
    singleUpload,
    landUpdateProduct
  );
router
  .route("/productLand/:id")
  .delete(isAuthorizedUser, authorizedRoles("admin"), landDeleteProduct);
// poduct controller route

router.route("/getMiscProducts").get(getMiscAllProducts);
router.route("/getMiscProducts/:id").get(miscProductDetails);
router
  .route("/updateMiscProducts/:id")
  .put(
    isAuthorizedUser,
    authorizedRoles("admin"),
    singleUpload,
    miscUpdateProduct
  );
router
  .route("/product/:id")
  .delete(isAuthorizedUser, authorizedRoles("admin"), miscDeleteProduct);

module.exports = router;
