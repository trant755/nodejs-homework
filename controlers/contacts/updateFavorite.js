const Contact = require("../../models/contact");
const createError = require("http-errors");

const updateFavorite = async (req, res, next) => {
  console.log(req.body);
  const newContact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );

  if (!newContact) {
    const error = createError.NotFound(
      `Product with id=${req.params.contactId} not found`
    );
    throw error;
  }

  res.status(200).json({ data: newContact });
};

module.exports = updateFavorite;
