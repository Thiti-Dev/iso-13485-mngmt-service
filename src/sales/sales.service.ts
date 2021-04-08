import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PaginateResult,
  PaginationDto,
} from 'src/shared/dto/pagination/pagination.dto';
import { ResponseMsg } from 'src/shared/helpers/ResponseMsg';
import { CreateSalesDataDTO } from './dto/create-sales-data.dto';
import { SalesRepository } from './sales.repository';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SalesRepository)
    private salesRepository: SalesRepository,
  ) {}

  async createSalesData(createSalesDataDTO: CreateSalesDataDTO) {
    return this.salesRepository.createSalesData(createSalesDataDTO);
  }

  // async getAllSalesData() {
  //   return ResponseMsg.success(await this.salesRepository.find());
  // }
  async findAll(paginationDto: PaginationDto): Promise<PaginateResult> {
    const skippedItem = (paginationDto.page - 1) * paginationDto.limit;

    const totalCount = await this.salesRepository.count();
    const sales_datas = await this.salesRepository
      .createQueryBuilder('sales')
      .orderBy('sales.createdAt', 'DESC')
      .offset(skippedItem)
      .limit(paginationDto.limit)
      .getMany();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: sales_datas,
      totalPage: Math.floor(totalCount / paginationDto.limit),
    };
  }

  async removeSalesData(id: number) {
    try {
      const removal = await this.salesRepository.delete(id);
      if (!removal.affected) {
        throw new NotFoundException(
          `Sale detail with id "${id}" doesn't exist`,
        );
      }
      return ResponseMsg.success(removal);
    } catch (error) {
      throw error; //throw the error for nestjs to handler in the proper form
    }
  }
}
