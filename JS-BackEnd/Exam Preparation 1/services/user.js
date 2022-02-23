const User = require("../models/User");
const { hash, compare } = require("bcrypt");
//TODO add all fields required by exam description
async function register(firstName,lastName, email, password) {
  const existing = await getUserByEmail(email);
  if (existing) {
    throw new Error("Username already exist");
  }

  const hashedPassword = await hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    email,
    hashedPassword,
  });
  await user.save();
  return user;
}

//TODO change identifier
async function login(email, password) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("Incorrect email or password ");
  }
  const hasMatch = await compare(password, user.hashedPassword);
  if (!hasMatch) {
    throw new Error("Incorrect email or password");
  }
  return user;
}

//TODO identifyuser by given identifier from exam description
async function getUserByEmail(email) {
  const user = User.findOne({ email : new RegExp(`^${email}$`, 'i')  });
  return user;
}
module.exports = {
  register,
  login,
};
