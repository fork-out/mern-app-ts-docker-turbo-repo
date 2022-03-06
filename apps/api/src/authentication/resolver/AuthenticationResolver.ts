import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";
import { isNativeError } from "util/types";

import { AuthContext } from "../../context/AuthContext";
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
    private readonly userService: UserService,
    private readonly authenticationService: AuthenticationService
  ) {}

  @Mutation(() => LoginResponse)
  public login(
    @Arg("input", () => CredentialsInput) input: CredentialsInput,
    @Ctx() { res }: AuthContext
  ): Promise<LoginResponse | ApiServiceError> {
    const result = this.authenticationService.login(input.email, input.password, res);

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

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: AuthContext) {
    const result = await this.authenticationService.logout(res);
    return result;
  }
}
