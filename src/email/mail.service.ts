import {HttpException, Injectable, StreamableFile} from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { MailService } from './mail.interface';
import { MailerService as MailerMain } from '@nestjs-modules/mailer';
import { createReadStream, readFileSync} from 'fs';
import { join } from 'path';
import * as path from 'path';
import * as pug from 'pug';
import {MAIL_TO} from "../config";

@Injectable()
export class MailServerService implements MailService{
    constructor(private readonly mailerMain: MailerMain) {}

    /**
     * Sends an email using the provided email server.
     *
     * @param {CreateEmailDto} email - The email object containing the recipient, subject, and text.
     * @return {Promise<void>} - A promise that resolves when the email is sent successfully.
     */
    async sendMail(email: CreateEmailDto): Promise<void> {
        const templateFile = path.join(__dirname, '../../src/email/template/notification.pug');

        const data = {
            subject: email.subject,
            sender: email.sender,
            wallet: email.wallet,
            message: email.message,
            year: new Date().getFullYear(),
        };

        const render = this._bodytemplate(templateFile, data);
        // console.log(render)

        await this._processSendEmail(MAIL_TO, email.subject, email.message, render);
    }

    /**
     * Generate the function comment for the given function body.
     *
     * @param {string} template - The path to the template file.
     * @param {Object} data - The data object to be passed to the template.
     * @return {string} The rendered template.
     */
    _bodytemplate(template, data) {
        return  pug.renderFile(template, { data });
    }

    /**
     * Sends an email with the specified details.
     *
     * @param {string} to - The recipient of the email.
     * @param {string} subject - The subject of the email.
     * @param {string} text - The plain text content of the email.
     * @param {string} body - The HTML content of the email.
     * @return {Promise<void>} A promise that resolves when the email is sent successfully.
     */
    async _processSendEmail(to, subject, text, body): Promise<void> {
        await  this.mailerMain.sendMail({
            to: to,
            subject: subject,
            text: text,
            html: body,
        })
    }

}
