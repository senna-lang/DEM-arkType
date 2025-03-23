import { type } from "arktype";

const _contact = type({
  email: "string.email",
  score: "number.integer < 100",
});

type _Contact = typeof _contact.t;

interface Contact extends _Contact {}

export const contact: type<Contact> = _contact;
const contacts = contact.array().atLeastLength(1);

const data1 = [
  {
    email: "test@test.com",
    score: 99,
  },
];

const data2 = [] as Contact[];

const parsedData1 = contacts(data1);
const parsedData2 = contacts(data2);

if (parsedData1 instanceof type.errors) {
  console.error(parsedData1.summary);
} else {
  console.log("data1 is valid");
}

if (parsedData2 instanceof type.errors) {
  console.error(parsedData2.summary);
} else {
  console.log("data2 is valid");
}
