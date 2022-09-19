import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';

import { fakeDataBase } from 'src/fakeData';
import { CreateReportDto } from './dtos/CreateReport.dto';
import { ReportService } from './report.service';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  async getReports(@Param() params: { type: string }): Promise<string> {
    const reportType = params.type;

    const allIncomeReports = await this.reportService.getAllReports();

    return allIncomeReports;
  }

  @Get('/:id')
  async getReportById(
    @Param() params: { id: string; type: string },
  ): Promise<string> {
    const reportId = params.id;
    const reportType = params.type;

    if (isNaN(parseInt(reportId)))
      throw new HttpException(
        'Income Report id is not a number',
        HttpStatus.BAD_REQUEST,
      );

    const incomeReport = await this.reportService.getReportById(
      parseInt(reportId),
    );

    return incomeReport;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createReport(@Body() body: CreateReportDto): Promise<string> {
    console.log('ola');

    console.log(body);

    // const resp = await this.reportService.createReport();
    return 'ola';
  }

  @Put('/:id')
  async updateReport(
    @Param() params: { id: string; type: string },
  ): Promise<string> {
    const reportId = params.id;
    const reportType = params.type;

    if (isNaN(parseInt(reportId)))
      throw new HttpException(
        'Income Report id is not a number',
        HttpStatus.BAD_REQUEST,
      );

    const resp = await this.reportService.updateReport(
      parseInt(reportId),
      'opa',
    );

    return resp;
  }

  @Delete('/:id')
  async deleteReport(
    @Param() params: { id: string; type: string },
  ): Promise<string> {
    const reportId = params.id;
    const reportType = params.type;

    if (isNaN(parseInt(reportId)))
      throw new HttpException(
        'Income Report id is not a number',
        HttpStatus.BAD_REQUEST,
      );

    const resp = await this.reportService.deleteReport(parseInt(reportId));

    return resp;
  }
}
