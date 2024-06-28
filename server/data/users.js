import bcrypt from "bcryptjs";

const users = [
  {
    firstName: "Admin",
    lastName: "Development Squad",
    email: "admin@web.de",
    phone: "490000000000",
    purpose: "Other",
    birthday: "1971-01-01",
    gender: "Male",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    cart: [],
  },
  {
    firstName: "Manager",
    lastName: "Business Squad",
    email: "manager@web.de",
    phone: "490000000001",
    purpose: "Other",
    birthday: "1971-01-01",
    gender: "Male",
    password: bcrypt.hashSync("123456", 10),
    isManager: true,
    cart: [],
  },
  {
    firstName: "Support",
    lastName: "Maintenance Squad",
    email: "support@web.de",
    phone: "490000000911",
    purpose: "Other",
    birthday: "1971-01-01",
    gender: "Male",
    password: bcrypt.hashSync("123456", 10),
    isSupport: true,
    cart: [],
  },
  {
    firstName: "Klava",
    lastName: "Novizki",
    email: "klava@web.de",
    phone: "8598526987456",
    birthday: "2000-02-02",
    gender: "Female",
    purpose: "Other",
    password: bcrypt.hashSync("123456", 10),
    cart: [],
  },
  {
    firstName: "John",
    lastName: "Johnson",
    email: "john@web.de",
    phone: "49589687965",
    birthday: "1996-06-06",
    gender: "Male",
    purpose: "Other",
    password: bcrypt.hashSync("123456", 10),
    cart: [],
  },
];

export default users;