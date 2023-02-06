const express = require("express");

const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { auth: ctrl } = require("../../controlers");
const auth = require("../../middlewares/auth");
const {
  signupUserValidation,
  loginUserValidation,
  updateSubscriptionValidation,
} = require("../../middlewares/userValidationMiddleware");

const router = express.Router();

router.post("/signup", signupUserValidation, ctrlWrapper(ctrl.signup));

router.post("/login", loginUserValidation, ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  auth,
  updateSubscriptionValidation,
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
