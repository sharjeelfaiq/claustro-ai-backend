import { createError } from "../../packages/index.js";
import { utility } from "#utility/index.js";
import { user } from "../../models/index.js";

const { hashPassword, comparePassword, generateToken } = utility;

export const AuthService = {
  signUp: async ({ email, password }) => {
    try {
      const existingUser = await user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw createError(400, "User with the provided email already exists");
      }

      const hashedPassword = await hashPassword(password);
      const user = await user.create({
        data: { email, password: hashedPassword },
      });

      const token = generateToken(user.id);

      const result = {
        email: user.email,
        role: user.role,
        token,
      };

      return result;
    } catch (error) {
      return handleError(error, "Failed to sign up user");
    }
  },
  signIn: async ({ email, password }) => {
    try {
      const user = await user.findUnique({ where: { email } });
      if (!user) throw createError(401, "Invalid credentials");

      const isValid = await comparePassword(password, user.password);
      if (!isValid) throw createError(401, "Invalid credentials");

      const token = user.generateAuthToken();

      const result = {
        email: user.email,
        role: user.role,
        token,
      };

      return result;
    } catch (error) {
      return handleError(error, "Failed to sign in user");
    }
  },
  signOut: async ({ email }) => {
    try {
      // sign out logic
    } catch (error) {
      return handleError(error, "Failed to sign out user");
    }
  },
};
