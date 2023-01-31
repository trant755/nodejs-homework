const Book = require("../../models/contact");
const createError = require("http-errors");

const updateById = async (req, res, next) => {
  const newContact = await Book.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );

  if (!newContact) {
    const error = createError(
      404,
      `Product with id=${req.params.contactId} not found`
    );
    throw error;
  }

  res.status(200).json({ data: newContact });
};

module.exports = updateById;
