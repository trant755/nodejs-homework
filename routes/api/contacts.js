const express = require("express");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { contacts: ctrl } = require("../../controlers");
const isValidId = require("../../middlewares/isValidId");
const auth = require("../../middlewares/auth");

const {
  addContactValidation,
  updateContactValidation,
  updateFavoriteValidation,
} = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", auth, isValidId, ctrlWrapper(ctrl.getById));

router.post("/", auth, addContactValidation, ctrlWrapper(ctrl.add));

router.put(
  "/:contactId",
  auth,
  isValidId,
  updateContactValidation,
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  updateFavoriteValidation,
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", auth, isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
