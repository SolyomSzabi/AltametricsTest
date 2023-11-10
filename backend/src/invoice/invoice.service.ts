import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Invoice, Prisma } from '@prisma/client';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async findAllInvoices(userId: number) {
    return this.prisma.invoice.findMany({
      where: { user_id: userId },
      include: {
        user: true,
      },
    });
  }

  async findInvoiceById(
    invoiceWhereUniqueInput: Prisma.InvoiceWhereUniqueInput,
  ): Promise<Invoice | null> {
    return this.prisma.invoice.findUnique({
      where: invoiceWhereUniqueInput,
    });
  }

  async createInvoice(data: {
    amount: number;
    due_date: Date;
    details: string;
    user_id: number;
  }) {
    return this.prisma.invoice.create({
      data,
    });
  }
}
