import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import configDev from "../../../config/config-dev";
import configProd from "../../../config/config-prod";

// set environment
const config = (process.env.NODE_ENV === "production"
  ? configProd
  : configDev);

export const Login = (req: Request, res: Response, next: NextFunction): void => {
  const token = jwt.sign({}, config.jwtSecret);
  res.status(200).json({ status: "Authorized", token });
  next();
};
