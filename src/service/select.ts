import { RowList } from "postgres";
import sqlDB from "../db/connect";

require("dotenv").config();

// const Id = nanoid(30);
export const GetUserByKey = async (key: string) => {
  const users = await sqlDB`
  select user_id,
    name,
    date_created,api_key
  from users
  where  
  api_key =${key}
    
`;

  return users;
};

export const GetAllUser = async (isActive: boolean) => {
  const users = await sqlDB`
  select user_id,
    name,
    date_created,api_key
  from users
  where  is_active=${isActive}
    
`;

  return users;
};

export const GetBillByKey = async (
  api_key: string,
  month: number | null | undefined
): Promise<RowList<any>> => {
  const mth =
    month != null && month != undefined
      ? sqlDB`and bills.month=${month}`
      : sqlDB``;

  const bills = await sqlDB`
  select bills.bill_id,
    bills.num_of_calls,bills.month,bills.amount,bills.paid,
    bills.date_created,bills.user_id,users.api_key
	from bills
   inner join users on bills.user_id=users.user_id
	where users.api_key=${api_key} ${mth}
    
`;

  return bills;
};

export const GetBillByUserId = async (userId: number, month: number) => {
  const bills = await sqlDB`
  select bill_id,
    num_of_calls,month,
    date_created,user_id
  from bills
  where  user_id=${userId} and month=${month}
    
`;

  return bills;
};

export const GetAllBill = async (isActive: boolean) => {
  const bills = await sqlDB`
  select bill_id,
    num_of_calls,month,
    date_created,user_id
  from bills
  where  is_active=${isActive ? 1 : 0}
    
`;

  return bills;
};
