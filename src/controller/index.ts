import { ErrorRequestHandler, Request, Response } from "express";

import { GetBillByKey, GetUserByKey } from "../service/select";
import { AddUser, AddBill } from "../service/insert";
import { UserI } from "../service/type";

export const Registration = async (req: Request, resp: Response, next: any) => {
  try {
    const { name } = req.body;
    const result = await AddUser(name);

    return resp.status(201).send({ result });
  } catch (error) {
    return resp.status(400).send({ error: "an error occured" });
  }
};

export const LocationLookup = async (
  req: Request,
  resp: Response,
  next: any
) => {
  try {
    const { api_key } = req.headers;

    const result = await GetUserByKey(api_key as string);
    const user = result[0] as UserI;
    AddBill(user.user_id);

    return resp.send({ result: "API call made" });
  } catch (error) {
    return resp.status(400).send({ error: "an error occured" });
  }
};

export const GetUsage = async (req: Request, resp: Response, next: any) => {
  try {
    const { month } = req.body;
    const { api_key } = req.headers;
    const result = await GetBillByKey(api_key as string, month);

    return resp.send(result);
  } catch (error) {
    return resp.status(400).send({ error: "an error occured" });
  }
};
