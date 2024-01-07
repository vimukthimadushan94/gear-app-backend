import { Controller } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('api/media')
export class MediaController {
  constructor(private mediaService: MediaService) {}
}
