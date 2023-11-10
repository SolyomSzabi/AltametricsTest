import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Bill, Prisma } from '@prisma/client';

@Injectable()
export class BillService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllBills(userId: number) {
    return this.prisma.bill.findMany({
      where: { user_id: userId },
      include: {
        user: true,
      },
    });
  }

  async findBillById(
    billWhereUniqueInput: Prisma.BillWhereUniqueInput,
  ): Promise<Bill | null> {
    return this.prisma.bill.findUnique({
      where: billWhereUniqueInput,
    });
  }

  async createBill(data: {
    amount: number;
    due_date: Date;
    details: string;
    user_id: number;
  }) {
    return this.prisma.bill.create({
      data,
    });
  }
}
