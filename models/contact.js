const { Schema, SchemaTypes, model } = require("mongoose");
const handleErrors = require("../helpers/handleSchemaErrors");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: "user",
  },
});

contactSchema.post("save", handleErrors);

const Contact = model("contact", contactSchema);

module.exports = Contact;
