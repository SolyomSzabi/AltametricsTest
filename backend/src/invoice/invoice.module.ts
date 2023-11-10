import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [InvoiceService, PrismaService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
