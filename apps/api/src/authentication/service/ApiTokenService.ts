import { randomInt } from "crypto";
import jsonWebToken, { JwtPayload, verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { Service } from "typedi";

import { ApiToken } from "../../ApiToken";
import { AuthContext } from "../../context/AuthContext";
import { ApiServiceError } from "../../shared/ApiServiceError";

@Service()
export class ApiTokenService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public constructor() {}

  public verifySignedToken(token: string): ApiToken | Error {
    try {
      return jsonWebToken.verify(token, process.env.ACCESS_TOKEN_SECRET!) as ApiToken;
    } catch (e) {
      return e as Error;
    }
  }

  public generateSignedToken(fields: Partial<ApiToken>, expiresInDays: number = 1) {
    const apiUser = {
      sub: fields.userId,
      session: randomSessionId(),
      ...fields
    };

    const token = jsonWebToken.sign(apiUser, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: expiresInDays * 86400
    });

    const decrypted = jsonWebToken.decode(token) as { exp: number };

    return { token, expires: new Date(decrypted.exp * 1000) };
  }
}

export const isAuthenticated: MiddlewareFn<AuthContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new ApiServiceError("not authenticated", "client-error");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as { userId: string };
  } catch (err) {
    console.log(err);
    throw new ApiServiceError("not authenticated", "client-error");
  }

  return next();
};

const randomSessionId = () => {
  return randomInt(281474976710655);
};
