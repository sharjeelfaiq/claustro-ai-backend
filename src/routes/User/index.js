import { express } from "#packages/index.js";
import { UserController } from "#controllers/index.js";

const usersRoutes = express.Router();

usersRoutes
  .get("/get-all", UserController.getAll)
  .get("/get-by-id/:userId", UserController.getById)
  .put("/update-by-id/:userId", UserController.updateById)
  .delete("/delete-by-id/:userId", UserController.deleteById);

export default usersRoutes;
