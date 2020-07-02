import {Body, Controller, Post, UploadedFile, UseInterceptors, ValidationPipe} from '@nestjs/common';
import {Request} from "./repository/request.entity";
import {CreateRequestDto} from "../../../common/dto/request/create-request.dto";
import {RequestService} from "./request.service";
import {ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiImplicitBody} from "@nestjs/swagger/dist/decorators/api-implicit-body.decorator";
import {ApiImplicitQuery} from "@nestjs/swagger/dist/decorators/api-implicit-query.decorator";
import {ApiImplicitParam} from "@nestjs/swagger/dist/decorators/api-implicit-param.decorator";
import {FileUploadDto} from "../../../common/dto/file/file-upload.dto";
import {RequestFileUploadDto} from "../../../common/dto/request/request-file-upload.dto";

@ApiTags('request')
@Controller('request')
export class RequestController {

    constructor(
        private readonly requestService: RequestService
    ) {
    }

    @Post('/create')
    async create(@Body(new ValidationPipe()) createRequestDto: CreateRequestDto): Promise<Request> {
        return this.requestService.create(createRequestDto)
    }

    //Закрыть роут
    @Post('/uploadRequestImage')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Vin номер',
        type: RequestFileUploadDto,
    })
    async uploadRequestImage(
        @UploadedFile() file,
        @Body() request
    ): Promise<Boolean> {
        return this.requestService.uploadRequestImage(file, parseInt(request.requestId))
    }

}
