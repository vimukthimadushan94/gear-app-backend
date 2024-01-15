import { IsNotEmpty, IsString } from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';

export class SampleDto {
  //   @IsNotEmpty()
  //   @IsString()
  name: string;

  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  file: MemoryStoredFile;
}
