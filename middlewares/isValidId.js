const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const id = req.params.contactId;

  if (!isValidObjectId(id)) {
    const error = new Error(
      `${req.params.contactId} is an incorrect ID format`
    );
    error.status = 400;
    next(error);
  }
  next();
};

module.exports = isValidId;
