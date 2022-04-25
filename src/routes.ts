import { Express, Request, Response } from "express";

import {HeadersSchema,RegistrationSchema} from "./middleware/schema";
import { Registration,LocationLookup, GetUsage } from "./controller";
import validateRequest  from "./middleware/validateRequest";


export default function (app: Express) {
  

  
  app.post("/api/register", validateRequest(RegistrationSchema), Registration);
  app.get("/api/location_lookup", validateRequest(HeadersSchema), LocationLookup);
  app.get("/api/getUsage", validateRequest(HeadersSchema), GetUsage);
  
  
  
}

