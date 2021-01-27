import bcrypt from 'bcryptjs';

interface UserSchema {
    name: string
    email: string
    password: string
    isAdmin: boolean
}

const users: UserSchema[] = [
    {
        name: "Admin User",
        email: "admin@lbn.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
      },
      {
        name: "Daniel Viana",
        email: "dan@lbn.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
      },
      {
        name: "João",
        email: "jo@lbn.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
      }
];

export default users;
