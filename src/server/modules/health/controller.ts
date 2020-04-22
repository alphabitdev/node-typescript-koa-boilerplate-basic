import { Context } from 'koa';
import HealthMonitor from '../../lib/HealthMonitor';

export default class HealthController {
  private health: HealthMonitor;

  constructor(health: HealthMonitor) {
    this.health = health;
  }

  public getHealth(ctx: Context) {
    const status = this.health.getStatus();

    ctx.body = status;
    ctx.status = status.isShuttingDown ? 503 : 200;
  }
}
