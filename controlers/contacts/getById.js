const Book = require("../../models/contact");
const createError = require("http-errors");

const getById = async (req, res, next) => {
  const foundContact = await Book.findById(req.params.contactId);
  if (!foundContact) {
    const error = createError(
      404,
      `Product with id=${req.params.contactId} not found`
    );
    throw error;
  }
  res.status(200).json({ data: foundContact });
};

module.exports = getById;
