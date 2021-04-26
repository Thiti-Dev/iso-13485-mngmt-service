import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreatePurchasementPartDetailDTO } from './dto/create-purchasement-part-detail.dto';
import { CreatePurchasementRequestDTO } from './dto/create-purchasement-request.dto';
import { CreatePurchasementSourceDTO } from './dto/create-purchasement-source.dto';
import { PurchasementService } from './purchasement.service';

@Controller('purchasement')
export class PurchasementController {
  constructor(private purchasementService: PurchasementService) {}

  @Post('/create-part-detail')
  async createPartDetail(@Body() createPurchasementPartDetailDTO: CreatePurchasementPartDetailDTO) {
    return this.purchasementService.createPartDetail(createPurchasementPartDetailDTO);
  }

  @Delete('/remove-part-detail/:part_number')
  async removePartDetail(@Param('part_number') part_number: string) {
    return this.purchasementService.removePartDetail(part_number);
  }

  //
  // ─── SOURCE ─────────────────────────────────────────────────────────────────────
  //
  @Post('/create-source-detail')
  async createPurchasementSource(@Body() createPurchasementSourceDTO: CreatePurchasementSourceDTO) {
    return this.purchasementService.createPurchasementSource(createPurchasementSourceDTO);
  }

  @Delete('/remove-source-detail/:id')
  async removePurchasementSource(@Param('id', ParseIntPipe) id: number) {
    return this.purchasementService.removePurchasementSource(id);
  }
  // ────────────────────────────────────────────────────────────────────────────────

  //
  // ─── PURCHASEMENT ───────────────────────────────────────────────────────────────
  //
  @Post('/create-purchasement-request')
  async createPurchasementRequest(@Body() createPurchasementRequestDTO: CreatePurchasementRequestDTO) {
    return this.purchasementService.createPurchasementRequest(createPurchasementRequestDTO);
  }
  // ─────────────────────────────────────────────────────────────────
}
