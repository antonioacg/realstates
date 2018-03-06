import * as express from "express";
import * as AuthenticatorGet from "./Authenticator-get";

const AuthenticatorRoutes = express.Router();

AuthenticatorRoutes.post("/", AuthenticatorGet.Login);

export default AuthenticatorRoutes;
