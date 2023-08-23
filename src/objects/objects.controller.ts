import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.decorator';
import { API_HOST } from '../config'
import { api } from "../services";

@ApiBearerAuth()
@ApiTags('objects')
@Controller('objects')
export class ObjectsController {

  constructor() {}

  @ApiOperation({ summary: 'Get objects on path' })
  @ApiResponse({ status: 200, description: 'Get objects on path.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get(':path')
  async objectsDetail(@Param('path') path): Promise<any> {
    let r;
    try {
      r = await api.objects.objectsDetail(path, {baseURL: `${API_HOST}/api/bus`});
    } catch (error) {
        console.log('error', error)
        return {status: error.response.status, statusText: error.response.statusText, data: error.response.data}
    }
    return {status: r.status, statusText: r.statusText, data: r.data};
  }

  @ApiOperation({ summary: 'Update object' })
  @ApiResponse({ status: 201, description: 'The object has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':path')
  async update(@Param('path') path) {
    let r;
    try {
      if (!path.endsWith('/')) {
        path += '/';
      }
      r = await api.objects.objectsUpdate(path, null, {baseURL: `${API_HOST}/api/worker`});
    } catch (error) {
      console.log('error', error)
      return {status: error.response.status, statusText: error.response.statusText, data: error.response.data}
    }
    return {status: r.status, statusText: r.statusText, data: r.data};
  }


}
