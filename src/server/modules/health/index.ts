import Koa from 'koa';
import Router from 'koa-router';
import HealthController from './controller';
import HealthMonitor from '../../lib/HealthMonitor';

export default (server: Koa, healthMonitor: HealthMonitor) => {
  const controller = new HealthController(healthMonitor);
  const router = new Router();

  router.get('/health', controller.getHealth.bind(controller));

  server.use(router.routes());
};
