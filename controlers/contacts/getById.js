const Book = require("../../models/contact");

const getById = async (req, res, next) => {
  const foundContact = await Book.findById(req.params.contactId);
  if (!foundContact) {
    const error = new Error(
      `Product with id=${req.params.contactId} not found`
    );
    error.status = 404;
    throw error;
  }
  res.status(200).json({ data: foundContact });
};

module.exports = getById;
