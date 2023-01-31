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
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const foundContact = contacts.find(
    (contact) => Number(contact.id) === Number(contactId)
  );
  if (!foundContact) {
    return null;
  }
  return foundContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const foundContact = contacts.find(
    (contact) => Number(contact.id) === Number(contactId)
  );

  if (!foundContact) {
    return null;
  }

  const refreshContacts = contacts.filter(
    (contact) => Number(contact.id) !== Number(contactId)
  );

  await fs.writeFile(contactsPath, JSON.stringify(refreshContacts), "utf8");
  return foundContact;
};

const addContact = async ({ name, email, phone }) => {
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
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => Number(contact.id) === Number(contactId)
  );
  if (index === -1) return null;

  contacts[index] = {
    ...contacts[index],
    ...body,
  };

  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");

  const newContact = contacts[index];
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
