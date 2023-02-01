const Contact = require("../../models/contact");
const createError = require("http-errors");

const getById = async (req, res, next) => {
  const foundContact = await Contact.findById(req.params.contactId);
  if (!foundContact) {
    const error = createError.NotFound(
      `Product with id=${req.params.contactId} not found`
    );
    throw error;
  }
  res.status(200).json({ data: foundContact });
};

module.exports = getById;
