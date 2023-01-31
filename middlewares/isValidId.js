const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");

const isValidId = (req, res, next) => {
  const id = req.params.contactId;

  if (!isValidObjectId(id)) {
    const error = createError(
      404,
      `${req.params.contactId} is an incorrect ID format`
    );
    next(error);
  }
  next();
};

module.exports = isValidId;
