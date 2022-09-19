import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
  async getAllReports(): Promise<string> {
    return 'teste';
  }

  async getReportById(reportId: number): Promise<string> {
    return `${reportId}`;
  }

  async createReport(reportInfo: string): Promise<string> {
    return `${reportInfo}`;
  }

  async updateReport(reportId: number, reportNewInfo: string) {
    return `${reportId}, ${reportNewInfo}`;
  }

  async deleteReport(reportId: number) {
    return `${reportId}`;
  }
}
