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
  ParseEnumPipe,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateReportDto, UpdateReportDto } from './dtos/Report.dto';
import { ReportType, Report } from './report.interface';
import { ReportService } from './report.service';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  async getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): Promise<Report[]> {
    const resp = await this.reportService.getAllReports(type);

    if (resp.status === false) {
      throw new HttpException(
        'Something went wrong :(',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const allReports = <Report[]>resp.message;
    if (allReports.length === 0)
      throw new HttpException(`No ${type} report found`, HttpStatus.NOT_FOUND);

    return allReports;
  }

  @Get('/:id')
  async getReportById(
    @Param('id', ParseIntPipe) id: number,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): Promise<Report> {
    const resp = await this.reportService.getReportById(id, type);

    if (resp.status === false) {
      throw new HttpException(
        'Something went wrong :(',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const report = <Report[]>resp.message;
    if (report.length === 0)
      throw new HttpException('No report found', HttpStatus.NOT_FOUND);

    return report[0];
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createReport(
    @Body() { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): Promise<string> {
    const resp = await this.reportService.createReport(amount, source, type);

    if (resp.status === false)
      throw new HttpException(
        'Something went wrong :(',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const message = <string>resp.message;

    return message;
  }

  @Put('/:id')
  async updateReport(
    @Body() newReportInfo: UpdateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<string> {
    const doesReportExist = await this.reportService.getReportById(id, type);

    const report = <Report[]>doesReportExist.message;

    if (report.length === 0)
      throw new HttpException(
        `The combination data of ${type} report and report id ${id} was not found on our data base!`,
        HttpStatus.NOT_FOUND,
      );

    const resp = await this.reportService.updateReport(id, newReportInfo);

    if (resp.status === false)
      throw new HttpException(
        'Something went wrong :(',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const message = <string>resp.message;

    return message;
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
