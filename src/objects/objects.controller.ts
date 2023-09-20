import {
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Res, Req
} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {api} from "../services";
import {FileInterceptor} from "@nestjs/platform-express";
import {ContentType} from "../services/api";
import {Response} from "express";
import {ConfigService} from "@nestjs/config";
import {api as apiLago} from "../services-lago";

@ApiBearerAuth()
@ApiTags('objects')
@Controller('objects')
export class ObjectsController {

  constructor(
      private configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'Get objects on path' })
  @ApiResponse({ status: 200, description: 'Get objects on path.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get(':wallet')
  async objectsDetail(@Param('wallet') wallet, @Headers() headers, @Query() query, @Res() res: Response): Promise<any> {
    // console.log(headers)
    let path = wallet + (!query.path.startsWith('/') ? '/' : '') + query.path || '';
    if (query.pathType === 'dir' && query.path && !query.path.endsWith('/')) {
      path += '/';
    }

    let serviceName = 'bus';
    if (query.serviceName) {
        serviceName = query.serviceName;
    }

    const params = {baseURL: `${this.configService.get<string>('API_HOST')}/api/${serviceName}`};
    if (query.format === 'blob') {
       params['format'] = 'arraybuffer';
    }

    let r;
    try {
      r = await api.objects.objectsDetail(path, params);
    } catch (error) {
        console.log('error', error)
        return {status: error.response.status, statusText: error.response.statusText, data: error.response.data}
    }

    if (query.format === 'blob') {
      res.contentType('application/octet-stream');
      res.status(r.status).send(r.data);
      return;
    }

    res.status(r.status).send(r.data);
  }

  @ApiOperation({ summary: 'Update object' })
  @ApiResponse({ status: 201, description: 'The object has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @UseInterceptors(FileInterceptor('file'))
  @Put(':wallet')
  async update(@Param('wallet') wallet: string, /*@UploadedFile() file,*/ @Req() req, @Query() query, @Res() res: Response) {
    let r;
    let file = null;
    let accumulatedData;
    req.on('data', chunk => {
      console.log(`Received ${chunk.length} bytes of data.`);
      // console.log(chunk)
      if (!accumulatedData) {
        accumulatedData = chunk;
      } else {
        accumulatedData = Buffer.concat([accumulatedData, chunk]);
      }
    })
    req.on('end', async () => {
      if (accumulatedData) {
        // process the last bit of data in accumulatedData
        console.log('end: accumulatedData length', accumulatedData.length)

        try {
          let path = wallet + (!query.path.startsWith('/') ? '/' : '') + query.path || '';
          if (query.pathType === 'dir' && query.path && !query.path.endsWith('/')) {
            path += '/';
          }
          let formData = null;
          const headers = {
            'Content-Type': file ? ContentType.FormData : ContentType.Text,
          }
          if (file) {
            formData = Buffer.from(file.buffer)
            headers['Content-Length'] = `${file.size}`
          }

          if (accumulatedData) {
            formData = accumulatedData;
            headers['Content-Length'] = `${formData.length}`
          }

          console.log('Usage upload for user', wallet)

          // const userData = await this.userService.findUserByWallet(wallet) // doesn't work here: "Using global EntityManager instance methods for context specific actions is disallowed"

          const resultSubscriptionsData = await apiLago.subscriptions.findAllSubscriptions({
            external_customer_id: wallet,
          });

          const subscriptionData = resultSubscriptionsData.data;

          const resultCustomerUsageData = await apiLago.customers.findCustomerCurrentUsage({
              externalCustomerId: wallet,
              external_subscription_id: 'sub_' + wallet,
            }
          );
          const  customerUsageData = resultCustomerUsageData.data;

          let limitExceeded = false;
          if (subscriptionData.subscriptions.find(x=> x.external_customer_id === wallet)?.plan_code === 'SMALL_YEARLY'
              && customerUsageData.customer_usage.total_amount_cents > 1000 /* 10 sc */) {
            limitExceeded = true;
          }

          if (limitExceeded) {
            console.log('Limit exceeded')
            res.status(HttpStatus.FORBIDDEN).send({error: 'Limit exceeded'});
            return;
          }


          console.log('Start uploading file')
          r = await api.objects.objectsUpdate(path, formData, {
            baseURL: `${this.configService.get<string>('API_HOST')}/api/worker`,
            type: file || accumulatedData ? ContentType.FormData : ContentType.Text,
            headers: headers
          });
          console.log('Finished uploading file')

          console.log('Register upload for user', wallet)
          const result = await apiLago.events.createEvent({
            event: {
              transaction_id: new Date().getTime().toString() + '_' + formData.length,
              code: 'FILES_VOL',
              external_customer_id: wallet,
              properties: {
                filesize: formData.length
              }
            }
          });
          console.log('Subscription event result', result)

          res.status(r.status).send(r.data);

        } catch (error) {
          console.log('error', error)
          res.status(error.response.status).send(error.response.data);
        }
      } else {
        console.warn('end: accumulatedData is empty')
      }
    })

  }

  @ApiOperation({ summary: 'Delete object' })
  @ApiResponse({ status: 201, description: 'The object has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':wallet')
  async delete(@Param('wallet') wallet, @Query() query) {
    let r;
    try {
      let path = wallet + '/' + query.path || '';
      if (query.pathType === 'dir' && query.path && !query.path.endsWith('/')) {
        path += '/';
      }
      r = await api.objects.objectsDelete2(path,  {baseURL: `${this.configService.get<string>('API_HOST')}/api/bus`});
    } catch (error) {
      console.log('error', error)
      return {status: error.response.status, statusText: error.response.statusText, data: error.response.data}
    }
    return {status: r.status, statusText: r.statusText, data: r.data};
  }

}
