import { Context } from "joi";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Service } from "typedi";
import { isNativeError } from "util/types";

import { isAuthenticated } from "../../authentication/service/ApiTokenService";
import { UserCreateInput } from "../schema/UserInput";
import { UserSchema } from "../schema/UserSchema";
import { UserService } from "../service/UserService";

@Service()
@Resolver()
export class UserResolvers {
  public constructor(private readonly userService: UserService) {}

  @Query(() => String)
  hello() {
    return "hi!";
  }

  @Query(() => UserSchema)
  @UseMiddleware(isAuthenticated)
  public me(@Ctx() { user }: Context): UserSchema {
    return new UserSchema({
      id: user.userId,
      name: user.name,
      email: user.email,
      role: user.role
    });
  }

  @Mutation(() => UserSchema)
  @UseMiddleware(isAuthenticated)
  public async userCreate(
    @Arg("input", () => UserCreateInput) input: UserCreateInput
  ): Promise<UserSchema> {
    const result = await this.userService.createUser(input);

    if (isNativeError(result)) {
      throw result;
    }

    return result;
  }
}
