import { Controller, Get } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('api/media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Get('/')
  async getAll() {
    return this.mediaService.get();
  }
}
