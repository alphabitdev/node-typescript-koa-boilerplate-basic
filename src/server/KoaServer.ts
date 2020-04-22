import { ErrorCallback, retry } from 'async';
import { Server } from 'http';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import pino from 'pino';
import { AppError } from './errors';
import health from './modules/health';
import responseTime from './middleware/response-time';
import errorHandler from './middleware/error-handler';
import logRequest from './middleware/log-request';
import HealthMonitor from './lib/HealthMonitor';
import requestId from 'koa-requestid';
import config from './config';

export default class KoaServer {
  private app: Koa;

  private server!: Server;

  private logger: pino.Logger;

  private healthMonitor: HealthMonitor;

  constructor(logger: pino.Logger) {
    this.app = new Koa();
    this.logger = logger;
    this.healthMonitor = new HealthMonitor();
  }

  public init() {
    this.registerProcessEvents();
    this.registerMiddlewares();
    this.registerModules();
  }

  public listen(port: number): Server {
    this.server = this.app.listen(port);
    return this.server;
  }

  public getServer(): Server {
    return this.server;
  }

  public getHealthMonitor(): HealthMonitor {
    return this.healthMonitor;
  }

  private registerMiddlewares() {
    this.app.use(helmet());
    this.app.use(requestId())
    this.app.use(responseTime);

    this.app.use(logRequest(this.logger));
    this.app.use(errorHandler(this.logger));
    this.app.use(
      bodyParser(config.bodyParser)
    );
    this.app.use(cors(config.corsConfig));
  }

  private registerModules() {
    health(this.app, this.healthMonitor);
  }

  private registerProcessEvents() {
    process.on('uncaughtException', (error: Error) => {
      this.logger.error('UncaughtException', error);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    process.on('unhandledRejection', (reason: any, promise: any) => {
      this.logger.info(reason, promise);
    });

    process.on('SIGTERM', async () => {
      this.logger.info('Starting graceful shutdown');

      this.getHealthMonitor().shuttingDown();

      let exitCode = 0;

      try {
        await this.closeServer();
      } catch (e) {
        this.logger.error('Error in graceful shutdown ', e);
        exitCode = 1;
      }

      process.exit(exitCode);
    });
  }

  public closeServer(): Promise<void> {
    if (this.server === undefined) {
      throw new AppError(10001, 'Server is not initialized.');
    }

    const checkPendingRequests = (callback: ErrorCallback<Error | undefined>) => {
      this.server.getConnections((err: Error | null, pendingRequests: number) => {
        if (err) {
          callback(err);
        } else if (pendingRequests > 0) {
          callback(Error(`Number of pending requests: ${pendingRequests}`));
        } else {
          callback(undefined);
        }
      });
    };

    return new Promise<void>((resolve, reject) => {
      retry(
        { times: 10, interval: 1000 },
        checkPendingRequests.bind(this),
        (error: Error | undefined | null) => {
          if (error) {
            this.server.close(() => reject(error));
          } else {
            this.server.close(() => resolve());
          }
        }
      );
    });
  }
}