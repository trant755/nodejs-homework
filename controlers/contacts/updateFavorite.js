const Book = require("../../models/contact");

const updateFavorite = async (req, res, next) => {
  console.log(req.body);
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

module.exports = updateFavorite;