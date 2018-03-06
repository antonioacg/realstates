import { Request, Response } from "express";
import RealState from "../models/RealState";

export const addNew = (req: Request, res: Response): any => {
    const address: string = req.body.address;
    const price: number = req.body.price;

    const realState = new RealState({
        address,
        price,
    });

    realState.save()
    .then((data) => {
        res.status(201).json(data);
    })
    .catch((err) => {
        res.status(500).json({ err });
    });
};
