// app.ts
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import compression = require('compression');
import methodOverride = require('method-override');
import errorHandler = require('errorhandler');
import mongoose = require('mongoose');
import { UserRouter } from './routes/UserRouter';
import { MONGODB_CONN } from './configs/default';

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
    this.connectDb();
    this.routes();
  }

  // middleware preparation
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(compression());
    this.express.use(methodOverride());
    this.express.use(errorHandler());

    global.Promise = require("q").Promise;

    // set static folder
    this.express.use(express.static(path.join(__dirname, 'public')));
  }

  private connectDb(): void {
    mongoose.connect(MONGODB_CONN);

    // set mongoose promise
    mongoose.Promise = global.Promise;

    // check connection
    mongoose.connection.on('connected', () => {
      console.log('Connected to the database: ' + MONGODB_CONN);
    });

    // check error on mongodb
    mongoose.connection.on('error', (err) => {
      console.log('Database error: ' + err);
    });
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
    this.express.use('/users', UserRouter);
  }
}

export default new App().express;