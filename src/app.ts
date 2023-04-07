import * as bodyParser from 'body-parser';
//import express from 'express';
import { Application, Express } from 'express-serve-static-core';
//import swaggerJsDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
//import * as swaggerDocument from './swagger.json';
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
        definition: {
                openapi: '3.0.0',
                info: {
                        title: 'Minha API',
                        version: '1.0.0',
                        description: 'Descrição da minha API'
                },
                servers: [
                        { url: 'http://localhost:4000' }
                ]
        },
        apis: [path.join(__dirname, '/controllers/*.ts')],
};

const specs = swaggerJsDoc(options);
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
                this.app.use('/api-docs', swaggerUi.serve,
                        swaggerUi.setup(specs));
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
