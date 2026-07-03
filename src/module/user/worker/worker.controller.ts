import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { Roles } from '../../../common/decorators/roles/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Roles('ADMIN', 'ENGINEER')
@ApiTags('Worker - trabajadores / usuarios')
@ApiBearerAuth()
@Controller('/worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get('/getallactiveworker')
  @ApiResponse({ type: CreateWorkerDto, isArray: true, status: 200 })
  getAllActiveWorker() {
    return this.workerService.getAllActiveWorker();
  }

  @Get('/getallworker')
  @ApiResponse({ type: CreateWorkerDto, isArray: true, status: 200 })
  getAllWorker() {
    return this.workerService.getAllWorker();
  }

  @Get('/getallactiveworkersimp')
  @ApiResponse({ type: CreateWorkerDto, isArray: true, status: 200 })
  getAllWorkerSimp() {
    return this.workerService.getAllActiveWorkerSimp();
  }

  @Get('/getoneworkerprofile/:id')
  @ApiResponse({ type: CreateWorkerDto, status: 200 })
  getOneWorkerProfile(@Param('id') id: string) {
    return this.workerService.getOneProfile(+id);
  }

  @Post('/create')
  @ApiBody({ type: CreateWorkerDto })
  @ApiResponse({ type: CreateWorkerDto, status: 201 })
  createOneWorker(/* @Body() createWorkerDto: CreateWorkerDto */) {
    return this.workerService.createWorker();
  }
}
