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
import { InvoiceService } from './invoice.service';
import { Invoice } from '@prisma/client';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoicesService: InvoiceService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAllInvoices(@Request() req):Promise<Invoice[]> {
    const invoices = await this.invoicesService.findAllInvoices(req.user.sub);
    return invoices;
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findInvoiceById(@Param('id') id: string): Promise<Invoice> {
    return this.invoicesService.findInvoiceById({ id: Number(id) });
  }

  @Post()
  @UseGuards(AuthGuard)
  async createInvoice(
    @Body() invoiceData: { amount: number; due_date: Date; details: string },
    @Request() req,
  ) {
    const createdInvoice = await this.invoicesService.createInvoice({
      ...invoiceData,
      user_id: req.user.sub,
    });
    return createdInvoice;
  }
}
