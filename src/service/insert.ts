import { nanoid } from "nanoid";
import sqlDB from "../db/connect";
import { GetBillByUserId } from "./select";

const today = new Date();

export const AddUser = async (name: string) => {
  const api_key = nanoid(30);
  const user = {
    name,
    api_key,
    date_created: today,
    is_active: true,
  };
  const users = await sqlDB`  
    insert into users ${sqlDB(
      user,
      "name",
      "api_key",
      "date_created",
      "is_active"
    )}
  `;

  return user;
};

export const AddBill = async (user_id: number) => {
  const month = new Date().getMonth() + 1;
  const pastBill = await GetBillByUserId(user_id, month);
  const num_of_calls = pastBill.length > 0 ? pastBill[0].num_of_calls + 1 : 1;
  const amtType=num_of_calls>0&&num_of_calls<1000000?5:num_of_calls>10000001&&num_of_calls<10000000?4.2:3.5;
  const amount=(num_of_calls/1000)*amtType;
  const bill = {
    num_of_calls,
    month,
    date_created: today,
    user_id,
    is_active: true,
  };

  if (pastBill.length === 0) {
    await sqlDB`  
    insert into bills ${sqlDB(
      {
        num_of_calls,
        month,
        date_created: today,
        user_id,
        is_active: true,amount
      },
      "num_of_calls",
      "month",
      "date_created",
      "user_id",
      "is_active","amount"
    )}
  `;
  } else {
    let billId = pastBill[0].bill_id;

    await sqlDB`  
      update bills set ${sqlDB(
        {
          num_of_calls,amount
        },
        "num_of_calls","amount"
      )}
      where bill_id = ${billId}
      `;
  }

  return bill;
};
