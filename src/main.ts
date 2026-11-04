import {NestApplication, NestFactory} from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {ExpressAdapter} from "@nestjs/platform-express";
import {Server} from "https";
import * as fs from "fs";
import express, {Express} from 'express';
import spdy from 'spdy';
import {ServerOptions} from "spdy";
import {USE_SSL} from "./config";
import { WebsocketServer } from './ws.server';

async function bootstrap() {
  const options = new DocumentBuilder()
      .setTitle('SIA Data Wallet API')
      .setDescription('SIA Data Wallet API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

  if (USE_SSL === 'false') {
    const appOptions = { cors: true };
    const app = await NestFactory.create(AppModule, appOptions);
    app.setGlobalPrefix('api');

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);

    const io = WebsocketServer.getInstance(app.getHttpServer());

    await app.listen(3003);
  } else {
    // Alternative to spdy server: https://docs.nestjs.com/faq/multiple-servers#multiple-simultaneous-servers
    const expressApp: Express = express();

    // https://github.com/spdy-http2/node-spdy
    const spdyOpts: ServerOptions = {
      key: fs.readFileSync('./test.key'),
      cert: fs.readFileSync('./test.crt'),
    };

    const server: Server = spdy.createServer(spdyOpts, expressApp);
    server.setTimeout(1000 * 60 * 30);
    server.headersTimeout = 0;
    server.requestTimeout = 0;

    const appOptions = {cors: true};

    const app: NestApplication = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressApp),
        appOptions
    );
    app.setGlobalPrefix('api');

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);

    const io = WebsocketServer.getInstance(server);

    await app.init();
    await server.listen(443);
  }
}

bootstrap()
  .catch((err) => {
    console.log(err);
  });
