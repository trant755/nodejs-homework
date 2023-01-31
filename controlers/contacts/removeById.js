const Book = require("../../models/contact");

const removeById = async (req, res, next) => {
  const deleteContact = await Book.findByIdAndRemove(req.params.contactId);

  if (!deleteContact) {
    const error = new Error(
      `Product with id=${req.params.contactId} not found`
    );
    error.status = 404;
    throw error;
  }

  res.status(200).json({ message: "contact deleted", data: deleteContact });
};

module.exports = removeById;
