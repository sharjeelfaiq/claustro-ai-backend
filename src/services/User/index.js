import { createError } from "#packages/index.js";
import { utility } from "#utility/index.js";
import { dataAccess } from "#dataAccess/index.js";

const { handleError } = utility;
const { fetchAllUsers, findUserById, updateUserById, deleteUserById } =
  dataAccess;

export const UserService = {
  getAll: async () => {
    try {
      const users = await fetchAllUsers();

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
      const visitor = await findUserById(userId);

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
      const visitor = await updateUserById(userId, userData);

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
      const visitor = await deleteUserById(userId);
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
