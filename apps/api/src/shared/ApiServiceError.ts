import { ApolloError, AuthenticationError, ValidationError } from "apollo-server-express";
import { ValidationError as JoiValidationError } from "joi";

export class ApiServiceValidationError extends ValidationError {
  constructor(validationError: JoiValidationError) {
    super(validationError.message);
  }
}

export type ApiServiceErrorCode = "not-found" | "client-error" | "UNAUTHORIZED";

export class ApiServiceError extends ApolloError {
  constructor(message: string, code: ApiServiceErrorCode, extensions?: Record<string, unknown>) {
    super(message, code, extensions);
  }
}

export class ApiServiceAuthenticationError extends AuthenticationError {}

export class ApiAuthorizationError extends ApiServiceError {
  constructor(message: string, extensions?: Record<string, unknown>) {
    super(message, "UNAUTHORIZED", extensions);

    Object.defineProperty(this, "name", { value: "AuthorizationError" });
  }
}

export function isApiServiceError(serviceResult: unknown): serviceResult is ApiServiceError {
  return serviceResult instanceof ApiServiceError;
}

export function isApiServiceValidationError(result: unknown): result is ValidationError {
  return result instanceof ValidationError;
}
