import { MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfig {
    static service: ConfigService;
    static orm: MikroORM;

    constructor(service: ConfigService, orm: MikroORM) {
        AppConfig.service = service;
        AppConfig.orm = orm;
    }

    static get(key: string): any {
        return AppConfig.service.get(key);
    }
}
