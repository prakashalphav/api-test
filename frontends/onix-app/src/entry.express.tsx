/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the express server when building for production.
 *
 * Learn more about the cloudflare integration here:
 * - https://qwik.builder.io/integrations/deployments/node/
 *
 */
import { createQwikCity, type PlatformNode } from '@builder.io/qwik-city/middleware/node';
import qwikCityPlan from '@qwik-city-plan';
import { manifest } from '@qwik-client-manifest';
import render from './entry.ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

declare global {
  interface QwikCityPlatform extends PlatformNode {}
}

const getRealClientIp = (input )=>{ 
  const parts = input.split(",").map((part) => part.trim());
  const firstItem = parts[0]; 
  return firstItem;
}

const isLocal = process.env.NODE_ENV === "local"  ;
// import compression from 'compression';

// Directories where the static assets are located
const distDir = join(fileURLToPath(import.meta.url), '..', '..', 'dist');
const buildDir = join(distDir, 'build');

// Allow for dynamic port
const PORT = process.env.PORT ?? 3000;

// Create the Qwik City express middleware
const { router, notFound } = createQwikCity({ render, qwikCityPlan, manifest });

// Create the express server
// https://expressjs.com/
const app = express();

// Enable gzip compression
// app.use(compression());

// Static asset handlers
// https://expressjs.com/en/starter/static-files.html
app.use(`/build`, express.static(buildDir, { immutable: true, maxAge: '1y' }));
app.use(express.static(distDir, { redirect: false  }));
app.use((req, res, next) => { 
  console.log( "x-server-name",  req.headers["x-server-name"] ?  req.headers["x-server-name"]  : "");
  globalThis.apiHost=  !isLocal &&  req.headers["x-server-name"]  ? "http://" +
  req.headers["x-server-name"] +
  ":" +
  req.headers["x-server-port"] : "";
  console.log( "x-server-port",  req.headers["x-server-port"] ?  req.headers["x-server-port"]  : "");
  console.log( "isLocal",  isLocal);
  console.log( "globalThis.apiHost",  globalThis.apiHost);

  globalThis.host= `${req.headers.host}`;
  globalThis.protocol= `${req.headers["x-forwarded-proto"]}`;
  globalThis.clientIp= getRealClientIp(req.headers["x-forwarded-for"]);
  next()
})
// Use Qwik City's page and endpoint request handler
app.use(router);

// Use Qwik City's 404 handler
app.use(notFound);

// Start the express server
app.listen(PORT, () => {
  /* eslint-disable */
  console.log(`Server starter: http://localhost:${PORT}/`);
});
