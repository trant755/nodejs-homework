const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.resolve("models/contacts.json");

const newID = (contacts) => {
  for (let index = 0; index < contacts.length; index += 1) {
    if (Number(contacts[index].id) !== index + 1) {
      return (index + 1).toString();
    }
  }
  return (contacts.length + 1).toString();
};

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const foundContact = contacts.find(
      (contact) => Number(contact.id) === Number(contactId)
    );
    return foundContact;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();

    const foundContact = contacts.find(
      (contact) => Number(contact.id) === Number(contactId)
    );

    const refreshContacts = contacts.filter(
      (contact) => Number(contact.id) !== Number(contactId)
    );

    await fs.writeFile(contactsPath, JSON.stringify(refreshContacts), "utf8");
    return foundContact;
  } catch (error) {
    console.log("remove error:", error);
    return error;
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();

    const newContact = {
      id: newID(contacts),
      name,
      email,
      phone,
    };

    const refreshContacts = [...contacts, newContact].sort(
      (a, b) => Number(a.id) - Number(b.id)
    );

    await fs.writeFile(contactsPath, JSON.stringify(refreshContacts), "utf8");
    return newContact;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();

    const refreshContacts = contacts.map((contact) => {
      const id = Number(contact.id);
      if (id === Number(contactId)) {
        return {
          ...contact,
          ...body,
        };
      }
      return contact;
    });

    await fs.writeFile(contactsPath, JSON.stringify(refreshContacts), "utf8");

    const newContact = refreshContacts.find(
      (contact) => Number(contact.id) === Number(contactId)
    );

    return newContact;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
