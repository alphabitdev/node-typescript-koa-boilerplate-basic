import pino from 'pino';
import KoaServer from './server/KoaServer';

// eslint-disable-next-line import/prefer-default-export
export async function init() {
  const logger = pino();

  try {
    // Starting the HTTP server
    logger.info('Starting HTTP KOA server');

    const port = Number(process.env.PORT) || 8080;

    const koaServer = new KoaServer(logger);
    koaServer.init();
    koaServer.listen(port);

    logger.info(`Application running on port: ${port}`);
  } catch (e) {
    logger.error(e, 'An error occurred while initializing koa server.');
  }
}

init();
