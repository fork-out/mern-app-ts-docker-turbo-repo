import { AuthenticationError } from "apollo-server-core";
import { Request, Response } from "express";
import jsonWebToken from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";

import { AuthContext } from "../../context/AuthContext";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const authHeaderRegex = /(\S+)\s+(\S+)/;
export const JID_COOKIE_KEY = "jid";

export const createAccessToken = (userId: string) => {
  return jsonWebToken.sign({ userId }, ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m"
  });
};

export const createRefreshToken = (userId: string) => {
  return jsonWebToken.sign({ userId }, REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d"
  });
};

export const verifyToken = (token: string, TOKEN_SECRET: string): any | Error => {
  try {
    return jsonWebToken.verify(token, TOKEN_SECRET) as any;
  } catch (e) {
    return e as Error;
  }
};

export function setRefreshToken(response: Response, token: string) {
  response.cookie(JID_COOKIE_KEY, token, {
    httpOnly: true,
    path: "/refresh_token"
  });
}

export const isAuthenticated: MiddlewareFn<AuthContext> = ({ context }, next) => {
  const token = extractTokenFromRequest(context.req);

  if (!token) {
    throw new AuthenticationError("Unauthorized");
  }

  try {
    const payload = verifyToken(token, ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.error(err);
    throw new AuthenticationError("Unauthorized");
  }

  return next();
};

export function extractTokenFromRequest(req: Request): string | undefined {
  if (req.headers["authorization"]) {
    const authorizationValue = req.headers["authorization"];
    const match = authorizationValue.match(authHeaderRegex);
    if (match) {
      return match[2];
    }
  }

  if (req?.cookies) {
    const token = req.cookies[JID_COOKIE_KEY] as string;
    if (token) {
      return token;
    }
  }

  return undefined;
}
