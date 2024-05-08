import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Res} from '@nestjs/common';
import { MailServerService } from './mail.service';
import { CreateEmailDto } from './dto/create-email.dto';
import {ValidationPipe} from "../shared/pipes/validation.pipe";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('mail')
@Controller()
export class MailServerController {
    constructor(private readonly emailServerService: MailServerService) {}

    @UsePipes(new ValidationPipe())
    @Post('mail/feedback')
    async sendMail(@Body('feedback') createEmailDto: CreateEmailDto, @Res() response: any) {
        try {
            await this.emailServerService.sendMail(createEmailDto);
            console.log('Email sent successfully')
            response.status(200).send({status: true});
        } catch (error) {
            console.error('Error sending mail', error)
            response.status(500).send({error: 'Error, something went wrong'});
        }
    }
}
