import { Arg, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";
import { isNativeError } from "util/types";

import { ApiServiceError } from "../../shared/ApiServiceError";
import { UserCreateInput } from "../../users/schema/UserInput";
import { UserSchema } from "../../users/schema/UserSchema";
import { UserService } from "../../users/service/UserService";
import { CredentialsInput } from "../schema/AuthenticationInput";
import { LoginResponse } from "../schema/AuthenticationSchema";
import { AuthenticationService } from "../service/AuthenticationService";

@Service()
@Resolver()
export class AuthenticationResolver {
  public constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService
  ) {}

  @Mutation(() => LoginResponse)
  public login(
    @Arg("input", () => CredentialsInput) input: CredentialsInput
  ): Promise<LoginResponse | ApiServiceError> {
    const result = this.authenticationService.login(input.email, input.password);

    if (isNativeError(result)) {
      throw result;
    }

    return result;
  }

  @Mutation(() => UserSchema)
  public async register(
    @Arg("input", () => UserCreateInput) input: UserCreateInput
  ): Promise<UserSchema> {
    const result = await this.userService.createUser(input);

    if (isNativeError(result)) {
      throw result;
    }

    return result;
  }
}
