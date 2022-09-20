export enum ReportType {
  Income = 'income',
  Expense = 'expense',
}

export interface Report {
  id: number;
  source: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
  type: ReportType;
}

export interface UpdateReport {
  amount?: number;
  source?: string;
}
