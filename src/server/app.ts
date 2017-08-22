import * as express from 'express';
import { renderModuleFactory } from '@angular/platform-server';

// Load zone.js for the server.
require('zone.js/dist/zone-node');

// Import the AOT compiled factory for your AppServerModule.
// This import will change with the hash of your built server bundle.
const AppServerModuleNgFactory = require('./main.bundle').AppServerModuleNgFactory;

// Load the index.html file.
const index = require('fs').readFileSync('./src/index.html', 'utf8');

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.routes();
  }

  private routes(): void {
    const router = express.Router();
    router.get('/', (req, res) => {
      renderModuleFactory(AppServerModuleNgFactory, { document: index, url: '/' })
        .then(response => res.send(response));
    });
    this.express.use('/', router);
  }
}

export default new App().express;
