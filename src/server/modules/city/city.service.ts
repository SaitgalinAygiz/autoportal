import {Inject, Injectable} from '@nestjs/common';
import {AccountRepository} from "../account/repository/account.repository";
import {City} from "./repository/city.entity";
import {Repository} from "typeorm";
import {IReadableCity} from "../../../common/readable/city/IReadableCity";

@Injectable()
export class CityService {

    constructor(
        @Inject('CITY_REPOSITORY')
        private readonly cityRepository: Repository<City>
    ) {
    }

    async all(): Promise<IReadableCity[]> {
        return await this.cityRepository.find()
    }

}