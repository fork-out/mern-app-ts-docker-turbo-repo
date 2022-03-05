import { Request, Response } from "express";

import { LoginResponse } from "./schema/AuthenticationSchema";

const authHeaderRegex = /(\S+)\s+(\S+)/;

const AUTH_COOKIE_NAME = "api-token";

export function extractTokenFromRequest(req: Request): string | undefined {
  if (req.headers["authorization"]) {
    const authorizationValue = req.headers["authorization"];
    const match = authorizationValue.match(authHeaderRegex);
    if (match) {
      return match[2];
    }
  }

  if (req?.cookies) {
    const token = req.cookies[AUTH_COOKIE_NAME] as string;
    if (token) {
      return token;
    }
  }

  return undefined;
}

export function clearJwtCookie(response: Response) {
  response.clearCookie(AUTH_COOKIE_NAME);
}

export function setResponseApiTokenCookie(
  response: Response,
  loginResponse: LoginResponse,
  domain: string | undefined
) {
  response.cookie(AUTH_COOKIE_NAME, loginResponse.token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    domain,
    expires: loginResponse.expires
  });
}
