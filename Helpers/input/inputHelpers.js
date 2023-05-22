import bycrpt from "bcryptjs";

export const validateUserInput = (email, password) => {
  return email && password;
};

export const comparePassword = (password, hashedPassword) => {
  return bycrpt.compareSync(password, hashedPassword);
};

const inputHelper = {
  validateUserInput,
  comparePassword,
};

export default inputHelper;
