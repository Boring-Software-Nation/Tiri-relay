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
import {LARGE_PLAN_LIMIT, MEDIUM_PLAN_LIMIT, TRIAL_PLAN_LIMIT} from "../config";

import {mkdirSync, unlinkSync, statSync, readFileSync, existsSync, mkdtempSync} from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { appendFileSync, closeSync, openSync } from "node:fs";

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
        return {
          status: error.response?.status ? error.response.status : 500,
          statusText: error.response?.statusText ? error.response.statusText : '',
          data: error.response?.data ? error.response.data : ''}
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
  @Put(':wallet')
  async update(@Param('wallet') wallet: string, @Req() req, @Query() query, @Res() res: Response) {
    let r;
    let accumulatedData;
    let tempDir = null, tempFilePath = null;
    let useTempFile = true;

    // req.setTimeout(1000 * 60 * 30)
    // res.setTimeout(1000 * 60 * 30);
    // res.socket.setTimeout(1000 * 60 * 30);

    req.on('data', chunk => {
      console.log(`Received ${chunk.length} bytes of data.`);
      // console.log(chunk)
      if (useTempFile && !tempFilePath) {
        console.log('Creating temp file')
        if (!tempDir || !existsSync(tempDir)) {
          tempDir = mkdtempSync(join(tmpdir(), 'upload-'));
        }
        tempFilePath = join(tempDir, 'upload.tmp');
        closeSync(openSync(tempFilePath, 'w'));
      }

      if (!useTempFile) {
        if (!accumulatedData) {
          accumulatedData = chunk;
        } else {
          accumulatedData = Buffer.concat([accumulatedData, chunk]);
          console.log(`Received ${chunk.length} bytes of data. AccumulatedData length: ${accumulatedData.length}`)
        }
      }

      if (tempFilePath) {
        console.log('Writing chunk to temp file')
        let fd;
        try {
          fd = openSync(tempFilePath, 'a');
          appendFileSync(fd, chunk);
        } catch (err) {
          console.error('Error writing to the temporary file:', err)
        } finally {
          if (fd !== undefined)
            closeSync(fd);
        }

        accumulatedData = true;
      }
    })
    req.on('error', function(err) {
      if (tempFilePath) {
        accumulatedData = false;
        unlinkSync(tempFilePath);
      }
      console.error(err)
    });
    req.on('end', async () => {
      if (accumulatedData || query.pathType === 'dir') {
        // process the last bit of data in accumulatedData

        try {
          let path = wallet + (!query.path.startsWith('/') ? '/' : '') + query.path || '';
          if (query.pathType === 'dir' && query.path && !query.path.endsWith('/')) {
            path += '/';
          }
          let formData = null;
          const headers = {
            'Content-Type': ContentType.Text,
          }

          if (accumulatedData) {
            if (!useTempFile) {
              formData = accumulatedData;
            }

            if (useTempFile) {
              if ((statSync(tempFilePath)).size > 0) {
                try {
                  console.log('end: reading temp file')
                  formData = readFileSync(tempFilePath);
                } catch (readError) {
                  console.error('Error reading the temporary file:', readError);

                  if (tempFilePath) {
                    unlinkSync(tempFilePath);
                    tempFilePath = null;
                    accumulatedData = false;
                  }

                  res.status(500).send('Error processing file');
                  return;
                }
              } else {
                console.log('end: temp file is empty')
                if (tempFilePath) {
                  unlinkSync(tempFilePath);
                  tempFilePath = null;
                  accumulatedData = false;
                }
              }
            }

            if (formData) {
              console.log('end: formData (accumulatedData) length', formData.length)
              headers['Content-Length'] = `${formData.length}`
            }
          }

          if (accumulatedData) {
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
            const customerUsageData = resultCustomerUsageData.data;

            let limitExceeded = false;
            const planCode = subscriptionData.subscriptions.find(x => x.external_customer_id === wallet)?.plan_code
            if ((planCode === 'TRIAL'
                    && parseInt(customerUsageData.customer_usage.charges_usage[0].units) > parseFloat(TRIAL_PLAN_LIMIT) * 1024 * 1024) ||
                (planCode === 'MEDIUM'
                    && parseInt(customerUsageData.customer_usage.charges_usage[0].units) > parseFloat(MEDIUM_PLAN_LIMIT) * 1024 * 1024) ||
                (planCode === 'LARGE'
                    && parseInt(customerUsageData.customer_usage.charges_usage[0].units) > parseFloat(LARGE_PLAN_LIMIT) * 1024 * 1024)
            ) {
              limitExceeded = true;
            }

            if (limitExceeded) {
              console.log('Limit exceeded')

              if (tempFilePath) {
                unlinkSync(tempFilePath);
                accumulatedData = false;
                tempFilePath = null;
              }

              res.status(HttpStatus.FORBIDDEN).send({error: 'Limit exceeded'});
              return;
            }
          }


          console.log('Start uploading file')
          r = await api.objects.objectsUpdate(path, formData, {
            baseURL: `${this.configService.get<string>('API_HOST')}/api/worker`,
            type:  accumulatedData ? ContentType.FormData : ContentType.Text,
            headers: headers
          });
          console.log('Finished uploading file')

          if (accumulatedData) {
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
            console.log('Subscription event status: ', result.status)
          }

          if (tempFilePath) {
            unlinkSync(tempFilePath);
            accumulatedData = false;
            tempFilePath = null;
          }

          res.status(r.status).send(r.data);

        } catch (error) {
          console.log('error', error)
          if (tempFilePath) {
            unlinkSync(tempFilePath);
            accumulatedData = false;
            tempFilePath = null;
          }
          res.status(error.response.status).send(error.response.data);
        }
      } else {
        console.warn('end: accumulatedData is empty')
        // if (tempFilePath) {
        //   await fsPromises.unlink(tempFilePath);
        // }
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

      let serviceName = 'bus';
      const params = {baseURL: `${this.configService.get<string>('API_HOST')}/api/${serviceName}`};
      let objDataResponse;
      let decreaseVol = 0;
      try {
        objDataResponse = await api.objects.objectsDetail(path, params);
        decreaseVol = -1 * objDataResponse.data.object.size
      } catch (error) {
        console.log('error', error)
        return {
          status: error.response?.status ? error.response.status : 500,
          statusText: error.response?.statusText ? error.response.statusText : '',
          data: error.response?.data ? error.response.data : ''}
      }

      r = await api.objects.objectsDelete2(path,  {baseURL: `${this.configService.get<string>('API_HOST')}/api/bus`});

      if (decreaseVol < 0) {
        console.log('Register decrease volume for user', wallet)
        const result = await apiLago.events.createEvent({
          event: {
            transaction_id: new Date().getTime().toString() + '_' + decreaseVol,
            code: 'FILES_VOL',
            external_customer_id: wallet,
            properties: {
              filesize: decreaseVol
            }
          }
        });
        console.log('Subscription event status: ', result.status)
      }
    } catch (error) {
      console.log('error', error)
      return {status: error.response.status, statusText: error.response.statusText, data: error.response.data}
    }
    return {status: r.status, statusText: r.statusText, data: r.data};
  }

}
