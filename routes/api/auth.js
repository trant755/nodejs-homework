const express = require("express");

const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { auth: ctrl } = require("../../controlers");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");
const {
  signupUserValidation,
  loginUserValidation,
  updateSubscriptionValidation,
  verifyEmailValidation,
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

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  verifyEmailValidation,
  ctrlWrapper(ctrl.resendVerifyEmail)
);

module.exports = router;
