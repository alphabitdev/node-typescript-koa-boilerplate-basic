import pino from 'pino';
import KoaServer from '../../src/server/KoaServer';

const logger = pino({ name: 'test', level: 'silent' });

const port = Number(process.env.PORT) || 8080;
const koaServer = new KoaServer(logger);
koaServer.init();
export const testServer = koaServer.listen(port);

export function shuttingDown(): void {
  koaServer.getHealthMonitor().shuttingDown();
}
export function end() {
  return koaServer.closeServer();
}
