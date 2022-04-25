import { object, string, ref,number } from "yup";

 
 export const HeadersSchema = object({
  headers: object({
    api_key: string()
      .required("api_key is required in your header")
  }),
});

export const RegistrationSchema = object({
  headers: object({
    api_key: string()
      .required("api_key is required in your header")
  }),
  body:object({
    name: string()
      .required("name is required")
  }),
});


