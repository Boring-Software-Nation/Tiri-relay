import {
  Controller,
  Get,
  Query,
  Res
} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {api} from "../services";
import {Response} from "express";
import {ConfigService} from "@nestjs/config";


@ApiBearerAuth()
@ApiTags('search')
@Controller('search/objects')
export class SearchController {

  constructor(
      private configService: ConfigService,
  ) {}


  @ApiOperation({ summary: 'Search objects' })
  @ApiResponse({ status: 200, description: 'Search objects.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  async objectsList( @Query() query, @Res() res: Response): Promise<any> {

    let serviceName = 'bus';
    const params = {baseURL: `${this.configService.get<string>('API_HOST')}/api/${serviceName}`};
    let r;
    try {
      // FIXME
      //r = await api.search.objectsList(query, params);
      r = {status: 200, data: {}}
    } catch (error) {
      console.log('error', error)
      return {
        status: error.response?.status ? error.response.status : 500,
        statusText: error.response?.statusText ? error.response.statusText : '',
        data: error.response?.data ? error.response.data : ''}
    }

    res.status(r.status).send(r.data);
  }



}
