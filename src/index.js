import { express } from "#packages/index.js";
import { applyMiddlewares } from "#middlewares/index.js";
import configRoutes from "#routes/index.js";
import listenServer from "#server/index.js";

const app = express();

applyMiddlewares(app);
configRoutes(app);
listenServer(app);

export default app;
