import { Report, ReportType } from './report/report.interface';

export const fakeDataBase: Report[] = [
  {
    id: 1,
    source: 'salary',
    amount: 7500,
    created_at: new Date(),
    updated_at: new Date(),
    type: ReportType.Income,
  },
  {
    id: 2,
    source: 'food',
    amount: 2000,
    created_at: new Date(),
    updated_at: new Date(),
    type: ReportType.Expense,
  },
  {
    id: 3,
    source: 'mom',
    amount: 3000,
    created_at: new Date(),
    updated_at: new Date(),
    type: ReportType.Income,
  },
];
