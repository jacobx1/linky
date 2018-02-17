import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import * as Auth from './auth';
import LinksRoute from './routes/links';
import DbConfig from './dao/config';

const CORS_ORIGIN = process.env.CORS_ORIGIN;

const HOST = process.env.HOST || '0.0.0.0';
const PORT = parseInt(process.env.PORT || '8080', 10);

const app = express();

if (CORS_ORIGIN) {
  app.use(
    cors({
      credentials: true,
      origin: CORS_ORIGIN,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204
    })
  );
}

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

Auth.configureApp(app, '/api/login', '/api/signup');

app.use('/api/links', LinksRoute);

app.listen(PORT, HOST, async () => {
  await createConnection(DbConfig());
  console.log(`App is running at ${HOST}:${PORT}`);
});
