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
      const visitor = await user.findUnique({
        where: { id: Number(userId) },
      });

      if (!visitor) {
        throw createError(404, "User not found");
      }

      return visitor;
    } catch (error) {
      return handleError(error, `Failed to fetch user by id: ${userId}`);
    }
  },
  updateById: async (userId, userData) => {
    try {
      const visitor = await user.update({
        where: { id: Number(userId) },
        data: userData,
      });

      if (!visitor) {
        throw createError(404, "User not found");
      }

      return visitor;
    } catch (error) {
      if (error.code === "P2025") {
        return handleError(
          createError(404, "User not found"),
          `Failed to update user by id: ${userId}`,
        );
      }
      return handleError(error, `Failed to update user by id: ${userId}`);
    }
  },
  deleteById: async (userId) => {
    try {
      const visitor = await user.delete({
        where: { id: Number(userId) },
      });
      if (!visitor) {
        throw createError(404, "User not found");
      }

      return "User deleted successfully";
    } catch (error) {
      if (error.code === "P2025") {
        return handleError(
          createError(404, "User not found"),
          `Failed to delete user by id: ${userId}`,
        );
      }
      return handleError(error, `Failed to delete user by id: ${userId}`);
    }
  },
};
