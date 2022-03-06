import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Service } from "typedi";
import { isNativeError } from "util/types";

import { isAuthenticated } from "../../authentication/helpers/tokenHelper";
import { AuthContext } from "../../context/AuthContext";
import { UserId } from "../../types/id";
import { UserCreateInput } from "../schema/UserInput";
import { UserSchema } from "../schema/UserSchema";
import { UserService } from "../service/UserService";

@Service()
@Resolver()
export class UserResolvers {
  public constructor(private readonly userService: UserService) {}

  @Query(() => UserSchema)
  @UseMiddleware(isAuthenticated)
  public async me(@Ctx() { payload }: AuthContext): Promise<UserSchema | null> {
    const { userId } = payload!;
    if (userId) {
      const user = await this.userService.getById(userId as UserId);

      if (isNativeError(user)) {
        throw user;
      }
      return user;
    }
    return null;
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
