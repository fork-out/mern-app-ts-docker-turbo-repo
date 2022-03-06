import { UserId } from "./id";

export type UserRole = "admin" | "user";

export type User = {
  id: UserId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  email: string;
  password: string;
  profilePic?: string;
};

export type ApiUser = Omit<User, "password" | "createdAt" | "updatedAt">;
