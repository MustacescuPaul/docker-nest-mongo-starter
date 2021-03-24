import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: 200, description: 'The user logged in successfully' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post('/login')
  async login(@Request() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user);
  }

  @ApiResponse({ status: 200, description: 'The user registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
