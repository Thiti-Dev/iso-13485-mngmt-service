import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateProtocalForProductDTO } from './dto/create-protocal-for-product.dto';
import { QualityControlService } from './quality-control.service';

@Controller('quality-control')
export class QualityControlController {
  constructor(private qualityControlService: QualityControlService) {}

  //
  // ─── PROTOCOL ───────────────────────────────────────────────────────────────────
  //
  @Get('/get-protocol-lists/:product_code')
  getProductProtocolRule(@Param('product_code') product_code: string) {
    return this.qualityControlService.getProductProtocolRule(product_code);
  }

  @Post('/create-protocol')
  async createProtocolForProduct(@Body() createProtocalForProductDTO: CreateProtocalForProductDTO) {
    return this.qualityControlService.createProtocolForProduct(createProtocalForProductDTO);
  }

  @Delete('/remove-protocol/:id')
  async removeProductProtocol(@Param('id', ParseIntPipe) id: number) {
    return this.qualityControlService.removeProductProtocol(id);
  }
  // ────────────────────────────────────────────────────────────────────────────────
}