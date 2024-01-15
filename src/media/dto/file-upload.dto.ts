// create a file-upload.dto.ts file
import { IsNotEmpty, IsString } from 'class-validator';

export class FileUploadDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  profilePicture: any; // This can be adjusted based on your file upload approach
}
