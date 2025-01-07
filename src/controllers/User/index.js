import { UserService } from "#services/index.js";

export const UserController = {
  getAll: async (_, res) => {
    try {
      const result = await UserService.getAll();

      res.status(201).json(result);
    } catch (error) {
      res.status(error?.status).json({ message: error?.message });
    }
  },
  getById: async (req, res) => {
    try {
      const { userId } = req.params;

      const result = await UserService.getById(userId);

      res.status(201).json(result);
    } catch (error) {
      res.status(error?.status).json({ message: error?.message });
    }
  },
  updateById: async (req, res) => {
    try {
      const { userId } = req.params;
      const userData = req.body;

      const result = await UserService.updateById(userId, userData);

      res.status(201).json(result);
    } catch (error) {
      res.status(error?.status).json({ message: error?.message });
    }
  },
  deleteById: async (req, res) => {
    try {
      const { userId } = req.params;

      const result = await UserService.deleteById(userId);

      res.status(201).json(result);
    } catch (error) {
      res.status(error?.status).json({ message: error?.message });
    }
  },
};
