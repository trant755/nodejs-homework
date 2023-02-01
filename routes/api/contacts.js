const express = require("express");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { contacts: ctrl } = require("../../controlers");
const isValidId = require("../../middlewares/isValidId");

const {
  addContactValidation,
  updateContactValidation,
  updateFavoriteValidation,
} = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", addContactValidation, ctrlWrapper(ctrl.add));

router.put(
  "/:contactId",
  isValidId,
  updateContactValidation,
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  updateFavoriteValidation,
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
