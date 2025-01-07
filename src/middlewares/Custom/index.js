import { utility } from "#utility/index.js";

export const middlewares = {
  authenticate: (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    try {
      const decoded = utility.verifyToken(token);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized: " + err.message });
    }
  },
};
