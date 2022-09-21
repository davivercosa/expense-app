import { Injectable } from '@nestjs/common';
import { fakeDataBase } from 'src/fakeData';
import { Report, ReportType, UpdateReport } from './report.interface';

@Injectable()
export class ReportService {
  async getAllReports(
    type: string,
  ): Promise<{ status: boolean; message: Report[] | Error }> {
    try {
      const allReports = fakeDataBase.filter((report) => report.type === type);

      return { status: true, message: allReports };
    } catch (error) {
      const err: Error = error;
      console.log(err);

      return { status: false, message: err };
    }
  }

  async getReportById(
    id: number,
    type: string,
  ): Promise<{ status: boolean; message: Report[] | Error }> {
    try {
      const reportById = fakeDataBase.filter(
        (report) => report.id === id && report.type === type,
      );

      return { status: true, message: reportById };
    } catch (error) {
      const err: Error = error;
      console.log(err);

      return { status: false, message: err };
    }
  }

  async createReport(
    amount: number,
    source: string,
    type: string,
  ): Promise<{ status: boolean; message: string | Error }> {
    try {
      const id = fakeDataBase.length + 1;
      const newReport = {
        id,
        amount,
        source,
        type: type === 'expense' ? ReportType.Expense : ReportType.Income,
        created_at: new Date(),
        updated_at: new Date(),
      };

      fakeDataBase.push(newReport);

      return {
        status: true,
        message: `${type} report ${id} created successfully`,
      };
    } catch (error) {
      const err: Error = error;
      console.log(err);

      return { status: false, message: err };
    }
  }

  async updateReport(
    id: number,
    reportNewInfo: UpdateReport,
  ): Promise<{ status: boolean; message: string | Error }> {
    try {
      const oldReportInfo = fakeDataBase[id - 1];

      oldReportInfo.amount =
        reportNewInfo.amount === undefined
          ? oldReportInfo.amount
          : reportNewInfo.amount;

      oldReportInfo.source =
        reportNewInfo.source === undefined
          ? oldReportInfo.source
          : reportNewInfo.source;

      oldReportInfo.updated_at = new Date();

      return { status: true, message: `Report ${id} was updated successfully` };
    } catch (error) {
      const err: Error = error;
      console.log(err);

      return { status: false, message: err };
    }
  }

  async deleteReport(
    id: number,
  ): Promise<{ status: boolean; message: string | Error }> {
    try {
      fakeDataBase.splice(id - 1, 1);

      return { status: true, message: `Report deleted successfully` };
    } catch (error) {
      const err: Error = error;
      console.log(err);

      return { status: false, message: err };
    }
  }
}
