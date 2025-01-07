import { bcrypt, jwt, createError, winston } from "#packages/index.js";
import { env } from "../env/index.js";

const { NODE_ENV, JWT_SECRET_KEY, JWT_EXPIRATION_TIME } = env;

const createLogger = () => {
  const logConfig = {
    levels: {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
    },
    colors: {
      error: "red",
      warn: "yellow",
      info: "green",
      debug: "blue",
    },
  };

  winston.addColors(logConfig.colors);

  const consoleFormat = winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(({ level, message, timestamp, stack, ...meta }) => {
      const metaString = Object.keys(meta).length
        ? ` | Meta: ${JSON.stringify(meta)}`
        : "";
      const stackString = stack ? `\nStack: ${stack}` : "";
      return `${timestamp} [${level}]: ${message}${metaString}${stackString}`;
    }),
  );

  return winston.createLogger({
    levels: logConfig.levels,
    transports: [
      new winston.transports.Console({
        format: consoleFormat,
        level: NODE_ENV === "production" ? "warn" : "debug",
        handleExceptions: true,
      }),
    ],
    exitOnError: false,
  });
};

const logger = createLogger();

export const utility = {
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  },
  comparePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },
  generateToken: (userId) => {
    const token = jwt.sign({ id: userId }, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRATION_TIME,
    });
    return token;
  },
  verifyToken: (token) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET_KEY);
      return decoded;
    } catch (err) {
      throw new Error("Invalid or expired token");
    }
  },
  handleError: (error, message) => {
    logger.error("Error: ", error);

    if (!error.status) {
      error = createError(500, message);
    }

    return {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  },
  logger,
};
