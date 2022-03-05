import winston from "winston";

export interface LocalLogger {
  info(message: string, properties?: Record<string, unknown>, error?: Error): string;
  debug(message: string, properties?: Record<string, unknown>, error?: Error): string;
  warn(message: string, properties?: Record<string, unknown>, error?: Error): string;
  error(message: string, error?: Error, properties?: Record<string, unknown>): string;
}

export type LogLevel = "info" | "debug" | "warn" | "error";

export class APILogger {
  private logger: winston.Logger;

  public constructor(level: LogLevel = "info") {
    const loggerLevel = winston.format(info => {
      info.level = `app-${info.level}`;
      return info;
    });

    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          level,
          format: winston.format.combine(
            loggerLevel(),
            winston.format.colorize(),
            winston.format.splat(),
            winston.format.simple()
          )
        })
      ]
    });

    if (process && process.on) {
      process.on("uncaughtException", uncaughtError => {
        this.error("", "Uncaught exception", {}, uncaughtError);
      });

      process.on("unhandledRejection", rejectionEvent => {
        console.error(rejectionEvent);
        this.error("", "Unhandled rejection", {}, rejectionEvent as Error);
      });
    }
  }

  public localLogger(location: string, localProperties?: Record<string, unknown>): LocalLogger {
    return {
      info: (message: string, properties?: Record<string, unknown>, error?: Error) =>
        this.info(location, message, { ...localProperties, ...properties }, error),
      debug: (message: string, properties?: Record<string, unknown>, error?: Error) =>
        this.debug(location, message, { ...localProperties, ...properties }, error),
      warn: (message: string, properties?: Record<string, unknown>, error?: Error) =>
        this.warn(location, message, { ...localProperties, ...properties }, error),
      error: (message: string, error?: Error, properties?: Record<string, unknown>) =>
        this.error(location, message, { ...localProperties, ...properties }, error)
    };
  }

  public info(
    location: string,
    message: string,
    properties?: Record<string, unknown>,
    error?: Error
  ): string {
    const logMessage = this.makeLogLine(location, message, properties, error);
    this.logger.info(logMessage);
    return this.makeLogReturn(location, message, properties);
  }

  public debug(
    location: string,
    message: string,
    properties?: Record<string, unknown>,
    error?: Error
  ): string {
    const logMessage = this.makeLogLine(location, message, properties, error);
    this.logger.debug(logMessage);
    return this.makeLogReturn(location, message, properties);
  }

  public warn(
    location: string,
    message: string,
    properties?: Record<string, unknown>,
    error?: Error
  ): string {
    const logMessage = this.makeLogLine(location, message, properties, error);
    this.logger.warn(logMessage);
    return this.makeLogReturn(location, message, properties);
  }

  public error(
    location: string,
    message: string,
    properties?: Record<string, unknown>,
    error?: Error
  ): string {
    const logMessage = this.makeLogLine(location, message, properties, error);
    this.logger.error(logMessage);
    return this.makeLogReturn(location, message, properties);
  }

  private makeLogLine(
    location: string,
    message: string,
    properties?: Record<string, unknown>,
    error?: Error
  ): string {
    const additionalDetails: string[] = [];

    if (error) {
      additionalDetails.push(errorString(error));
    }

    if (properties && Object.keys(properties).length > 0) {
      const propertiesString = JSON.stringify(properties, null, 2);
      additionalDetails.push(propertiesString);
    }

    return `${location}: ${message}${
      additionalDetails.length ? ` | ${additionalDetails.join(" | ")}` : ""
    }`;
  }

  private makeLogReturn(
    location: string,
    message: string,
    properties?: Record<string, unknown>
  ): string {
    return `${location}: ${message} | ${JSON.stringify(properties)}`;
  }
}

function errorString(error: Error): string {
  if (error.stack) {
    return error.stack;
  }
  return error.toString();
}
