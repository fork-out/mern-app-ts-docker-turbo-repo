import { APILogger, LocalLogger, LogLevel } from "./Logger";

/**
 * Base modules is a root level module for a node process.  Only one of these should be used per module instance.
 */
export abstract class BaseService {
  protected readonly logger: LocalLogger;
  protected readonly apiLogger: APILogger;

  public constructor(logSettings: {
    location: string;
    localProperties?: Record<string, unknown>;
    logLevel?: LogLevel;
    condensed?: boolean;
  }) {
    this.apiLogger = new APILogger(logSettings.logLevel || "info");
    this.logger = this.apiLogger.localLogger(logSettings.location, logSettings.localProperties);
  }

  protected abstract onRun(): Promise<void>;

  protected abstract onStop(): Promise<void>;

  public async run(): Promise<void> {
    this.trapStopSignals();
    await this.onRun();
  }

  /**
   * Watches for stop signals from Node
   */
  private trapStopSignals(): void {
    const signalTraps: NodeJS.Signals[] = ["SIGTERM", "SIGINT", "SIGUSR2"];

    signalTraps.forEach(type => {
      process.once(type, async (type: NodeJS.Signals) => {
        try {
          await this.onStop();
        } finally {
          process.kill(process.pid, type);
        }
      });
    });
  }
}
