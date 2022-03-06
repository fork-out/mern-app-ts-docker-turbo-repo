import { UserInputError } from "apollo-server-express";
import { hash } from "bcryptjs";
import { Service } from "typedi";

import { AppDatabase } from "../../database/AppDatabase";
import { ApiServiceError } from "../../shared/ApiServiceError";
import { userId } from "../../shared/Identifier";
import { UserId } from "../../types/id";
import { User } from "../../types/user";
import { UserCreateInput } from "../schema/UserInput";
import { UserSchema } from "../schema/UserSchema";

@Service()
export class UserService {
  constructor(private readonly database: AppDatabase) {}

  async getById(userId: UserId): Promise<User | ApiServiceError> {
    const user = await this.database.users.get(userId);

    if (!user) {
      return new ApiServiceError(`user with id ${userId} was not found`, "not-found");
    }

    return user;
  }

  async createUser(input: UserCreateInput): Promise<UserSchema | ApiServiceError> {
    const existingUserByEmail = await this.database.users.getByEmail(
      input.email.toLocaleLowerCase()
    );

    if (existingUserByEmail) {
      return new UserInputError("existing user found with provided email", {
        id: existingUserByEmail.id,
        email: existingUserByEmail.email
      });
    }

    const hashedPassword = await hash(input.password, 12);

    const newUser: User = {
      id: userId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      role: "user",
      name: input.name,
      email: input.email.toLocaleLowerCase(),
      password: hashedPassword,
      profilePic: input.profilePic
    };

    await this.database.users.insert(newUser);

    return newUser;
  }
}
