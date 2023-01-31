const Book = require("../../models/contact");

const updateById = async (req, res, next) => {
  const newContact = await Book.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );

  if (!newContact) {
    const error = new Error(
      `Product with id=${req.params.contactId} not found`
    );
    error.status = 404;
    throw error;
  }

  res.status(200).json({ data: newContact });
};

module.exports = updateById;
