/**
 * Boot entrypoint. Reads config from the environment, wires the adapter, and
 * starts the Fastify server.
 */

import { HaipConnectAdapter } from './haip-connect-adapter.js';
import { buildApp } from './app.js';
import { isLoggingEnabled } from './events.js';

const baseUrl = process.env['BAIA_API_BASE_URL'];
const apiKey = process.env['BAIA_CONNECT_API_KEY'];

if (!baseUrl) {
  console.error('FATAL: BAIA_API_BASE_URL is required.');
  process.exit(1);
}
if (!apiKey) {
  console.error('FATAL: BAIA_CONNECT_API_KEY is required.');
  process.exit(1);
}

const port = Number(process.env['PORT'] ?? 8080);
const publicBaseUrl = process.env['PUBLIC_BASE_URL'] ?? `http://localhost:${port}`;

const adapter = new HaipConnectAdapter({ baseUrl, apiKey });
const app = buildApp({
  adapter,
  publicBaseUrl,
  gatewayApiKey: process.env['GATEWAY_API_KEY'],
});

app
  .listen({ port, host: '0.0.0.0' })
  .then(() => {
    app.log.info(`BAIA Connect GPT gateway on :${port}`);
    app.log.info(`  upstream BAIA : ${baseUrl}`);
    app.log.info(`  public URL    : ${publicBaseUrl}`);
    app.log.info(`  OpenAPI       : ${publicBaseUrl}/openapi.json`);
    app.log.info(`  tool logging  : ${isLoggingEnabled() ? 'enabled' : 'disabled'}`);
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
