import { Application } from "express";
import RealStatesRoutes from "./modules/RealStates/routes/index";
import Authenticator from "./modules/Authenticator/routes/index";

const urlBase = "/api/v1";

const allRoutes = (server: Application): void => {
  server.use(`${urlBase}/realstates`, RealStatesRoutes );
  server.use(`${urlBase}/login`, Authenticator );

  // Default route errorhandler
  server.use((req, res, next): void => {
    res.status(500).json({
      msg: `Error on route. This route exist?`,
      route: req.originalUrl,
      status: 500,
    });
    next();
  });
};

export default allRoutes;
