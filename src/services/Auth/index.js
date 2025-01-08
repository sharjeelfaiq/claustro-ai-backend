import { createError } from "#packages/index.js";
import { utility } from "#utility/index.js";
import { dataAccess } from "#dataAccess/index.js";

const {
  hashPassword,
  comparePassword,
  generateToken,
  expireToken,
  handleError,
} = utility;

const { createUser, findUserByEmail } = dataAccess;

export const AuthService = {
  signUp: async ({ name, email, password }) => {
    try {
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        throw createError(400, "User with the provided email already exists");
      }

      const hashedPassword = await hashPassword(password);
      const newUser = await createUser(name, email, hashedPassword);

      const token = generateToken(newUser.id);

      const result = {
        email: newUser.email,
        role: newUser.role,
        token,
      };

      return result;
    } catch (error) {
      return handleError(error, "Failed to sign up user");
    }
  },
  signIn: async ({ email, password }) => {
    try {
      const existingUser = await findUserByEmail(email);
      if (!existingUser) throw createError(401, "Invalid credentials");

      const isValid = await comparePassword(password, existingUser.password);
      if (!isValid) throw createError(401, "Invalid credentials");

      const token = generateToken(existingUser.id);

      const result = {
        email: existingUser.email,
        role: existingUser.role,
        token,
      };

      return result;
    } catch (error) {
      return handleError(error, "Failed to sign in user");
    }
  },
  signOut: async ({ token }) => {
    try {
      await expireToken(token);
      return "Successfully signed out";
    } catch (error) {
      return handleError(error, "Failed to sign out user");
    }
  },
};
