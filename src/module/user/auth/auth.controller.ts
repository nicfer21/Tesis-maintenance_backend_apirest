import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponseDto } from '../../../common/types/response.types';
import { Public } from '../../../common/decorators/public/public.decorator';
import type { Request } from 'express';
import { CreateRefreshDto } from './dto/create-refresh.dto';

@ApiTags('Autenticación - inicias sesión')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Public()
  @ApiBody({ type: CreateAuthDto })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  signIn(@Req() req: Request, @Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn(createAuthDto, req);
  }

  @Post('/refresh')
  @Public()
  @ApiBody({ type: CreateRefreshDto })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  refreshSession(
    @Req() req: Request,
    @Body() createRefreshDto: CreateRefreshDto,
  ) {
    return this.authService.refreshToken(req, createRefreshDto);
  }

  @Get()
  @ApiBody({ description: 'Validate Token' })
  @ApiBearerAuth()
  async validateToken() {
    return await this.authService.validateToken();
  }
}
