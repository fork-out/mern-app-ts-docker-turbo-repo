import { compare } from "bcryptjs";
import { Service } from "typedi";

import { AppDatabase } from "../../database/AppDatabase";
import { ApiServiceError } from "../../shared/ApiServiceError";
import { LoginResponse } from "../schema/AuthenticationSchema";
import { ApiTokenService } from "./ApiTokenService";

@Service()
export class AuthenticationService {
  public constructor(
    private readonly database: AppDatabase,
    private readonly apiTokenService: ApiTokenService
  ) {}

  public async login(email: string, password: string): Promise<LoginResponse | ApiServiceError> {
    const user = await this.database.users.getByEmail(email.toLocaleLowerCase());

    if (!user) {
      return new ApiServiceError(`user with email ${email} was not found`, "not-found");
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      return new ApiServiceError(`Invalid credentials`, "client-error");
    }

    const { token, expires } = await this.apiTokenService.generateSignedToken(user);
    return {
      token,
      expires
    };
  }
}
