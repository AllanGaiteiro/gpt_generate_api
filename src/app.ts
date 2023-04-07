import * as bodyParser from 'body-parser';
//import express from 'express';
import { Application, Express } from 'express-serve-static-core';
const express = require('express');
//import * as swaggerUi from 'swagger-ui-express';
//import * as swaggerDocument from './swagger.json';

export class App {
        public app: Application;
        public port: number;
        constructor(controllers: Express[], port: number) {
                this.app = express();
                this.port = port;
                this.initializeMiddlewares();
                this.initializeControllers(controllers);
        }
        private initializeMiddlewares() {
                this.app.use(bodyParser.json());
                //this.app.use('/api-docs', swaggerUi.serve, 
                //swaggerUi.setup(swaggerDocument));
        }
        private initializeControllers(controllers: Express[]) {
                controllers.forEach((controller) => {
                        this.app.use('/', controller);
                });
        }
        public listen() {
                this.app.listen(this.port, () => {
                        console.log(`App listening on the port ${this.port}`);
                });
        }
}
export default App;
