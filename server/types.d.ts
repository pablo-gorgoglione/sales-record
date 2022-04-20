import { UserAttributes } from "./models/user";

export type UserWithOutId = Omit<UserAttributes, "id">;
export type UserWithOutPassword = Omit<UserAttributes, "password">;
export interface UserWithToken extends UserWithOutPassword {
  token: string;
}
