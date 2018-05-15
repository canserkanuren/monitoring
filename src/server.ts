import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from "path";
import responseTime from "response-time";

const statusMonitor = require('express-status-monitor')();

import { ManageController, HealthCheckController, ExecController } from './controllers';
import { logger } from './config';

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use("/static", express.static(path.join(__dirname, "../public")));
app.use(statusMonitor);
app.use(responseTime());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
  Route
**/
app.use('/manage', ManageController);
app.use('/healthcheck', HealthCheckController);
app.use('/exec', ExecController);

app.listen(port, () => {
  logger.info(`Listening at http://localhost:${port}/`);
});
