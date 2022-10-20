import * as bodyParser from 'body-parser';
import * as swaggerUI from 'swagger-ui-express';
import express from 'express';
import {RegisterRoutes} from './router/routes';

export default class App {
  express: express.Express;

  constructor() {
    this.express = express();
    this.middleware();
    this.Setroutes();
    this.startSwagger();
  }
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
    this.express.disable('x-powered-by');
  }
  private Setroutes(): void {
    RegisterRoutes(this.express); //tsoa
  }

  /**
   * start swagger-ui express server and setup the documentation to be served
   */
  private startSwagger(): void {
    try {
      const swaggerDoc = require('../swagger.json');
      this.express.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
    } catch (error) {
      console.error(error);
    }
  }
}
