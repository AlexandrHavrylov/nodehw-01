const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      if (!contact) {
        throw new Error(`Contact with ${id} not found`);
      }
      console.log(contact);
      break;

    case "add":
      const newContacts = await addContact(name, email, phone);

      if (!newContacts) {
        throw new Error(`Contact with ${id} not found`);
      }
      console.log(newContacts);
      break;

    case "remove":
      const contactToRemove = await removeContact(id);
      if (!contactToRemove) {
        throw new Error(`Contact with ${id} not found`);
      }
      console.log(contactToRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
