import { compare } from "bcryptjs";
import { Response } from "express";
import { Service } from "typedi";

import { AppDatabase } from "../../database/AppDatabase";
import { ApiServiceError } from "../../shared/ApiServiceError";
import { ApiUser } from "../../types/user";
import {
  JID_COOKIE_KEY,
  createAccessToken,
  createRefreshToken,
  setRefreshToken
} from "../helpers/tokenHelper";
import { LoginResponse } from "../schema/AuthenticationSchema";

@Service()
export class AuthenticationService {
  public constructor(private readonly database: AppDatabase) {}

  public async login(
    email: string,
    password: string,
    response: Response
  ): Promise<LoginResponse | ApiServiceError> {
    const user = await this.database.users.getByEmail(email.toLocaleLowerCase());

    if (!user) {
      return new ApiServiceError(`user with email ${email} was not found`, "not-found");
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      return new ApiServiceError(`Invalid credentials`, "client-error");
    }

    // Login Successful
    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);
    setRefreshToken(response, refreshToken);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        profilePic: user.profilePic
      } as ApiUser
    };
  }

  public logout(response: Response): boolean {
    response.clearCookie(JID_COOKIE_KEY);
    setRefreshToken(response, "");
    return true;
  }
}
