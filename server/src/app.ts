// app.ts
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import compression = require('compression');
import methodOverride = require('method-override');

class App {
  // express application
  public express: express.Application;

  // bootstrap the application
  public static bootstrap(): App {
    return new App();
  }

  // prepare App object
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // middleware preparation
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(compression());

    // todo: FIND THE DOCS
    this.express.use(methodOverride());
  }

  // router setup
  private routes(): void {
    let router = express.Router();

    router.get('/', (req, res, next) => {
      res.json({
        success: true,
        msg: 'Hello, World'
      });  
    });

    // setting router
    this.express.use('/', router);
  }
}

export default new App().express;