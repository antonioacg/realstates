import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../../../config";

export const Login = (req: Request, res: Response, next: NextFunction): void => {
  const token = jwt.sign({}, config.jwtSecret);
  res.status(200).json({ status: "Authorized", token });
  next();
};
