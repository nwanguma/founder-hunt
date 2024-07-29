// src/auth/auth.controller.ts
import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GoogleAuthGuard } from './google-auth.guard';
import { LinkedInAuthGuard } from './linkedin-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Request() req) {
    return this.authService.signup(req.body);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('linkedin')
  @UseGuards(LinkedInAuthGuard)
  async linkedinAuth(@Request() req) {}

  @Get('linkedin/callback')
  @UseGuards(LinkedInAuthGuard)
  async linkedinAuthRedirect(@Request() req) {
    return this.authService.login(req.user);
  }
}
