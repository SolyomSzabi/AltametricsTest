import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { BillService } from './bill.service';
import { Bill } from '@prisma/client';

@Controller('bills')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAllBills(@Request() req): Promise<Bill[]> {
    const bills = await this.billService.findAllBills(req.user.sub);
    return bills;
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findBillById(@Param('id') id: string): Promise<Bill> {
    return this.billService.findBillById({ id: Number(id) });
  }

  @Post()
  @UseGuards(AuthGuard)
  async createBill(
    @Body() billData: { amount: number; due_date: Date; details: string },
    @Request() req,
  ) {
    const createdBill = await this.billService.createBill({
      ...billData,
      user_id: req.user.sub,
    });
    return createdBill;
  }
}
