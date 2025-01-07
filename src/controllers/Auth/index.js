import { AuthService } from "#services/index.js";

export const AuthController = {
  signUp: async (req, res) => {
    try {
      const userData = req.body;

      const result = await AuthService.signUp(userData);
      const token = result.token;

      res
        .status(201)
        .set("Authorization", `Bearer ${token}`)
        .json({ ...result, token: undefined });
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || error,
      });
    }
  },
  signIn: async (req, res) => {
    try {
      const userData = req.body;

      const result = await AuthService.signIn(userData);
      const token = result.token;

      res
        .status(200)
        .set("Authorization", `Bearer ${token}`)
        .json({ ...result, token: undefined });
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || error,
      });
    }
  },
  signOut: async (req, res) => {
    try {
      const userData = req.body;

      const result = await AuthService.signOut(userData);

      res.status(200).json(result);
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || error,
      });
    }
  },
};
