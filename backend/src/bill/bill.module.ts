import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [BillService, PrismaService],
  controllers: [BillController],
})
export class BillModule {}
