import { createError } from "#packages/index.js";
import { utility } from "#utility/index.js";
import { user } from "#models/index.js";

const { handleError } = utility;

export const UserService = {
  getAll: async () => {
    try {
      const users = await user.findMany();

      if (!users.length) {
        throw createError(404, "Users not found");
      }

      return users;
    } catch (error) {
      return handleError(error, "Failed to fetch users");
    }
  },
  getById: async (userId) => {
    try {
      const user = await user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw createError(404, "User not found");
      }

      return user;
    } catch (error) {
      return handleError(error, `Failed to fetch user by id: ${userId}`);
    }
  },
  updateById: async (userId, userData) => {
    try {
      const user = await user.update({
        where: { id: userId },
        data: userData,
      });

      if (!user) {
        throw createError(404, "User not found");
      }

      return user;
    } catch (error) {
      return handleError(error, `Failed to update user by id: ${userId}`);
    }
  },
  deleteById: async (userId) => {
    try {
      const user = await user.delete({
        where: { id: userId },
      });
      if (!user) {
        throw createError(404, "User not found");
      }

      return "User deleted successfully";
    } catch (error) {
      return handleError(error, `Failed to delete user by id: ${userId}`);
    }
  },
};
