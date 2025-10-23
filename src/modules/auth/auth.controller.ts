import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { SwaggerConsumesEnum } from 'src/common/enums/swaggerConsumes.enum';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user-existence')
  @ApiConsumes(SwaggerConsumesEnum.UrlEncoded , SwaggerConsumesEnum.Json)
  userExistence(@Body() authDto: AuthDto) {
    return this.authService.userExistence(authDto);
  }
}
