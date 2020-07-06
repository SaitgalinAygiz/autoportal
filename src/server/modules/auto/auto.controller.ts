import {Body, Controller, Get, Post, Query, Res, UploadedFile, UseInterceptors, ValidationPipe} from '@nestjs/common';
import {Auto} from "./repository/auto.entity";
import {AutoService} from "./auto.service";
import {ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {LoadAutoImageDto} from "../../../common/dto/auto/load-auto-image.dto";
import {Response} from "express";
import {GetAutoIconDto} from "../../../common/dto/auto/get-auto-icon.dto";

@ApiTags('auto')
@Controller('auto')
export class AutoController {

    constructor(
        private readonly autoService: AutoService
    ) {}

    @Get()
    async all(): Promise<Auto[]> {
        return await this.autoService.all()
    }

    @Post('/uploadAutoIcon')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Загрузить фотографию иконки автомобиля',
        type: LoadAutoImageDto,
    })
    async uploadAutoIcon(
        @UploadedFile() file,
        @Body() request
    ): Promise<Auto> {
        return this.autoService.uploadAutoIcon(
            file, parseInt(request.autoId)
        )
    }

    @Get('/getAutoIcon')
    async getAutoIcon(
        @Query(new ValidationPipe()) getAutoIconDto: GetAutoIconDto, @Res() res
    ) {
        await this.autoService.getAutoIcon(getAutoIconDto.autoId, res)
    }
}
