import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../logger";
import { GetUserByKey } from "../service";

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
        headers: req.headers,
      });
      
      if (req.url !== "/api/register") {
        
        const API_KEY = req.headers["api_key"] as string;
        const verifyKey = await VerifyKey(API_KEY);
        if (!verifyKey) return res.status(401).json({ error: "Access Denied" });
      }
      return next();
    } catch (er: any) {
      return res.status(400).send(er);
    }
  };

const VerifyKey = async (key: string) => {
  if (key === "") return false;

  const dt = await GetUserByKey(key);

  return dt.count > 0 ? true : false;
};

export default validate;
