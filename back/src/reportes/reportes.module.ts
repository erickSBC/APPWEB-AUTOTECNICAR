import { Module } from '@nestjs/common';
import { ReportesController } from './reportes.controller';
import { ReportesService } from './reportes.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ReportesController],
  providers: [ReportesService],
  exports: [ReportesService],
  imports: [AuthModule],
})
export class ReportesModule {}
