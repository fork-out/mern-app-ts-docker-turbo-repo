import { UserId } from "./types/id";
import { UserRole } from "./types/user";

export type JWTToken = {
  session: number;
  sub?: string;
  userId?: UserId;
  email: string;
  name?: string;
  role: UserRole;
};

export type ApiToken = JWTToken;

export function isAdminUserToken(user: ApiToken): user is ApiToken {
  return user.role === "admin";
}
