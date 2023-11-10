import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillModule } from './bill/bill.module';
import { InvoiceModule } from './invoice/invoice.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [InvoiceModule, BillModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
