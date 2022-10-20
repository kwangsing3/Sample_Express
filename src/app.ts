/* eslint-disable no-process-exit */
import * as http from 'http';
import * as bodyParser from 'body-parser';
import express from 'express';
import * as swaggerUI from 'swagger-ui-express';

import {RegisterRoutes} from './router/routes';
import './controllers/helloWorldController';

// Creates and configures an ExpressJS web server.
class serv {
  // ref to Express instance
  express: express.Express;

  // Run configuration methods on the Express instance.
  constructor() {
    // test
    this.express = express();

    this.middleware();
    this.routes();
    this.startSwagger();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
    this.express.disable('x-powered-by');
  }

  // Configure API endpoints.
  private routes(): void {
    // use generated routes by tsoa for swagger-ui
    RegisterRoutes(this.express);
  }

  /**
   * start swagger-ui express server and setup the documentation to be served
   */
  private startSwagger(): void {
    try {
      const swaggerDoc = require('../swagger.json');
      this.express.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
    } catch (error) {
      console.error(error);
    }
  }
}

//
const server = http.createServer(new serv().express);

const normalizePort = (val: number | string): number | string | boolean => {
  const normolizedPort = typeof val === 'string' ? parseInt(val, 10) : val;
  if (isNaN(normolizedPort)) {
    return val;
  }
  if (normolizedPort >= 0) {
    return normolizedPort;
  }
  return false;
};

const port = normalizePort(process.env.PORT || 3000);

const onError = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
    case 'EADDRINUSE':
      process.exit(1);
    default:
      throw error;
  }
};
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr!.port}`;
  console.info(`Listening on ${bind}`);
};

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
