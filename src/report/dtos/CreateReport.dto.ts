/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType;
  }[];
}

enum ReportType {
  Income = 'income',
  Expense = 'expense',
}
