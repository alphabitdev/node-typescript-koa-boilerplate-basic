import { expect } from 'chai';
import { describe, it } from 'mocha';
import HealthMonitor from '../../../../src/server/lib/HealthMonitor';

describe('HealthMonitor', () => {
  describe('getStatus', () => {
    it('Should return isShuttingDown true', async () => {
      const health = new HealthMonitor();
      let status = health.getStatus();

      expect(status.isShuttingDown).equals(false);

      health.shuttingDown();

      status = health.getStatus();

      expect(status.isShuttingDown).equals(true);
    });
  });
});
