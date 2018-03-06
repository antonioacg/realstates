import { Request, Response } from "express";
import RealState from "../models/RealState";

export const getAll = (req: Request, res: Response): any => {
  RealState.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

export const getById = (req: Request, res: Response): any => {
  const id: string = req.params.id;
  RealState.findById({ _id: id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};
