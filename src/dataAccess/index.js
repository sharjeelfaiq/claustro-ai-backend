import { user } from "#models/index.js";

export const dataAccess = {
  createUser: async (name, email, hashedPassword) =>
    await user.create({
      data: { name, email, password: hashedPassword },
    }),
  findUserByEmail: async (email) =>
    await user.findUnique({
      where: { email },
    }),
  fetchAllUsers: async () => await user.findMany(),
  findUserById: async (id) =>
    await user.findUnique({
      where: { id: Number(userId) },
    }),
  updateUserById: async (id, userData) =>
    await user.update({
      where: { id: Number(userId) },
      data: userData,
    }),
  deleteUserById: async (id) =>
    await user.delete({
      where: { id: Number(userId) },
    }),
};
