import { Module } from '@nestjs/common';
import { MailServerService } from './mail.service';
import { MailServerController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';


@Module({
    controllers: [MailServerController],
    providers: [MailServerService],
    exports: [MailServerService],
})
export class MailServerModule {}
