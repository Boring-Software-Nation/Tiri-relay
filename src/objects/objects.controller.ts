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
  Res
} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {API_HOST} from '../config'
import {api} from "../services";
import {FileInterceptor} from "@nestjs/platform-express";
import {ContentType} from "../services/api";
import {Response} from "express";
import {map} from "rxjs";

@ApiBearerAuth()
@ApiTags('objects')
@Controller('objects')
export class ObjectsController {

  constructor() {}

  @ApiOperation({ summary: 'Get objects on path' })
  @ApiResponse({ status: 200, description: 'Get objects on path.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get(':wallete')
  async objectsDetail(@Param('wallete') wallete, @Headers() headers, @Query() query, @Res() res: Response): Promise<any> {
    // console.log(headers)
    let path = wallete + (!query.path.startsWith('/') ? '/' : '') + query.path || '';
    if (query.pathType === 'dir' && query.path && !query.path.endsWith('/')) {
      path += '/';
    }

    let serviceName = 'bus';
    if (query.serviceName) {
        serviceName = query.serviceName;
    }

    const params = {baseURL: `${API_HOST}/api/${serviceName}`};
    if (query.format) {
      params['format'] = query.format;
    }

    let r;
    try {
      r = await api.objects.objectsDetail(path, params);
    } catch (error) {
        console.log('error', error)
        return {status: error.response.status, statusText: error.response.statusText, data: error.response.data}
    }

    res.status(r.status).send(r.data);
  }

  @ApiOperation({ summary: 'Update object' })
  @ApiResponse({ status: 201, description: 'The object has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseInterceptors(FileInterceptor('file'))
  @Put(':wallete')
  async update(@Param('wallete') wallete, @UploadedFile() file, @Query() query, @Headers() headers) {
    let r;
    try {
      let path = wallete + (!query.path.startsWith('/') ? '/' : '') + query.path || '';
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

      r = await api.objects.objectsUpdate(path, formData, {
        baseURL: `${API_HOST}/api/worker`,
        type: file ? ContentType.FormData : ContentType.Text,
        headers: headers
      });
    } catch (error) {
      console.log('error', error)
      return {status: error.response.status, statusText: error.response.statusText, data: error.response.data}
    }
    return {status: r.status, statusText: r.statusText, data: r.data};
  }

  @ApiOperation({ summary: 'Delete object' })
  @ApiResponse({ status: 201, description: 'The object has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':wallete')
  async delete(@Param('wallete') wallete, @Query() query) {
    let r;
    try {
      let path = wallete + '/' + query.path || '';
      if (query.pathType === 'dir' && query.path && !query.path.endsWith('/')) {
        path += '/';
      }
      r = await api.objects.objectsDelete2(path,  {baseURL: `${API_HOST}/api/bus`});
    } catch (error) {
      console.log('error', error)
      return {status: error.response.status, statusText: error.response.statusText, data: error.response.data}
    }
    return {status: r.status, statusText: r.statusText, data: r.data};
  }

}
