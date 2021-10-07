import "reflect-metadata";
import {createConnection} from "typeorm";
import {AppRoutes} from "./routes";

import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";

require('dotenv').config()

createConnection({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_HOST),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  },
  entities: [
    "dist/entity/**/*.{ts,js}"
  ],
  synchronize: true,
}).then(async connection => {

  // create koa app
  const app = new Koa();
  const router = new Router();

  // register all application routes
  AppRoutes.forEach(route => router[route.method](route.path, route.action));

  // run app
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(3000);

  console.log("Koa application is up and running on port 3000");

}).catch(error => console.log("TypeORM connection error: ", error));


