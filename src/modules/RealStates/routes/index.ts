import * as express from "express";
import * as realStatesGet from "./RealStates-get";
import * as realStatesPost from "./RealStates-post";

const RealStateRoutes = express.Router();

RealStateRoutes.get("/", realStatesGet.getAll);
RealStateRoutes.get("/:id", realStatesGet.getById);
RealStateRoutes.post("/", realStatesPost.addNew);

export default RealStateRoutes;
