import { express } from "#packages/index.js";
import { AuthController } from "#controllers/index.js";

const authRoutes = express.Router();

authRoutes
  .post("/signup", AuthController.signUp)
  .post("/signin", AuthController.signIn)
  .post("/signout", AuthController.signOut);

export default authRoutes;
