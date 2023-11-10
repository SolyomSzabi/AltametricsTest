import {
  Res,
  Body,
  Post,
  Controller,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto);
  }

  @Post('register')
  async register(
    @Body() registerDto: Record<string, any>,
    @Res() response: Response,
  ) {
    try {
      const user = await this.authService.register(registerDto);
      return response.status(200).json(user);
    } catch (error) {
      return response
        .status(403)
        .json({ message: 'Registration failed', error: error.message });
    }
  }
}
