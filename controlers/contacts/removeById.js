const Book = require("../../models/contact");
const createError = require("http-errors");

const removeById = async (req, res, next) => {
  const deleteContact = await Book.findByIdAndRemove(req.params.contactId);

  if (!deleteContact) {
    const error = createError(
      404,
      `Product with id=${req.params.contactId} not found`
    );
    throw error;
  }

  res.status(200).json({ message: "contact deleted", data: deleteContact });
};

module.exports = removeById;
