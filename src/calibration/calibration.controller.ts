import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { User } from 'src/user/model/user.entity';
import { uploadMultiplePhoto, uploadSinglePhoto } from 'src/utilities/fs/image-upload';
import { CalibrationService } from './calibration.service';
import { CreateCalibrationEvidenceDTO } from './dto/create-calibration-evidence.dto';
import { CreateCalibrationCycleDTO } from './dto/create-calibration-schedule.dto';

@Controller('calibration')
export class CalibrationController {
  constructor(private calibrationService: CalibrationService) {}

  @Get()
  getAllCalibrationSchedules() {
    return this.calibrationService.getAllCalibrationSchedules();
  }

  @Post()
  createCalibrationSchedule(@Body() createCalibrationCycleDTO: CreateCalibrationCycleDTO) {
    return this.calibrationService.createCalibrationSchedule(createCalibrationCycleDTO);
  }

  @Delete('/:id')
  async removeCalibrationSchedule(@Param('id', ParseIntPipe) id: number) {
    return this.calibrationService.removeCalibrationSchedule(id);
  }

  //
  // ─── EVIDENCE ───────────────────────────────────────────────────────────────────
  //
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const upload = await uploadSinglePhoto(file);
    if (!upload.success) {
      console.log(upload.errors);
    }
    console.log(upload);
  }
  @Post('upload_multiple')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    const upload = uploadMultiplePhoto(files);
    if (upload.success) {
      console.log(upload);
    }
  }

  @Get('evidence/')
  async gelAllCalibrationEvidence() {
    return this.calibrationService.gelAllCalibrationEvidence();
  }

  @Post('evidence/')
  @UseGuards(AuthGuard())
  @UseInterceptors(AnyFilesInterceptor())
  async createCalibrationEvidence(@Body() createCalibrationEvidenceDTO: CreateCalibrationEvidenceDTO, @UploadedFiles() files: Array<Express.Multer.File>, @GetUser() user: User) {
    if (!files || !files.length) throw new BadRequestException('You have to upload a file');
    return this.calibrationService.createCalibrationEvidence(createCalibrationEvidenceDTO, files, user);
  }

  @Get('evidence/:serial_number')
  async getCalibrationEvidenceHistoryOfSpecificSerialNumber(@Param('serial_number') serial_number: string) {
    return this.calibrationService.getCalibrationEvidenceHistoryOfSpecificSerialNumber(serial_number);
  }

  // ────────────────────────────────────────────────────────────────────────────────
}
