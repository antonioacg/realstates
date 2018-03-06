import * as BodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as basicAuth from "express-basic-auth";
import * as jwt from "express-jwt";
import * as session from "express-session";
import * as helmet from "helmet";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import * as passport from "passport";
import { unlessPath } from "./config/unlessPath";
import allRoutes from "./routes";

import configDev from "./config/config-dev";
import configProd from "./config/config-prod";

// set environment
const config = (process.env.NODE_ENV === "production"
  ? configProd
  : configDev);

const server: express.Application = express();
const PORT = process.env.PORT || 3000;

/**
 * Node.js body parsing middleware.
 * https://github.com/expressjs/body-parser
 */
server.use(BodyParser.urlencoded({ extended: true }));
server.use(BodyParser.json());

/*
 * CORS is a node.js package for providing a Connect/Express middleware that
 * can be used to enable CORS with various options.
 * https://github.com/expressjs/cors
 */
server.use(cors());

// Sessions
server.use(
  session({ secret: config.jwtSecret, resave: true, saveUninitialized: true }),
);

// PassportJS
server.use(passport.initialize());
server.use(passport.session());

/**
 * Helmet helps you secure your Express apps by setting various HTTP headers.
 * https://github.com/helmetjs/helmet
 */
server.use(helmet());

// Mongoose
(mongoose as any).Promise = global.Promise;
mongoose
  .connect(config.mongoDB, { useMongoClient: true })
  .then(() => console.log("Conected on MongoDB"), (err) => console.log(err));

/**
 * Some libs an configs, can run only in development mode.
 */
if (process.env.NODE_ENV !== "production") {
  /**
   * HTTP request logger middleware for node.js
   * https://github.com/expressjs/morgan
   */
//  const morgan = require('morgan');
  server.use(morgan("dev"));

  /**
   * Show documentation on dev mode
   * Show run app client on dev mode
   */
  server.use("/doc", express.static("src/public/doc"));
  server.use("/", express.static("src/public/app"));
  server.use("/app", express.static("src/public/app"));
} else {
  // All resources inside `else` statement, will be available only production mode.

  /**
   * Show documentation on production mode
   * Show run app client on production mode
   */
  server.use("/doc", express.static("build/public/doc"));
  server.use("/", express.static("build/public/app"));
  server.use("/app", express.static("build/public/app"));

  /**
   * Protect all routes.
   * Routes includes in `./config/unlessPath.ts` will not be protected.
   */
  server.use(jwt({ secret: config.jwtSecret }).unless(unlessPath));
}

// Default error
server.use(
  (err: ErrorEventHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err.name === "UnauthorizedError") {
      res.status(401).send("login Error");
    }
  },
);

/**
 * Set all routes in application
 */
allRoutes(server);

/**
 * Run server on setted port
 * Show wich mode is running
 */
server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${process.env.NODE_ENV} mode.`,
  );
});

/**
 * Export `express instance` for use in tests environment
 */
export default server;
