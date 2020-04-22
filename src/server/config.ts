import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
export interface KoaServerConfig {
  corsConfig: cors.Options;
  bodyParser: bodyParser.Options;
}

const config: KoaServerConfig = {
  corsConfig: {
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id']
  },
  bodyParser: {
    enableTypes: ['json'],
    jsonLimit: '10mb'
  }
}

export default config;