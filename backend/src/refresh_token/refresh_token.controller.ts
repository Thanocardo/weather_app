import { Controller, Post, Res, Req, UnauthorizedException, UseGuards, Param, Patch } from '@nestjs/common';
import { Request, Response } from 'express';
import { RefreshTokenService } from './refresh_token.service';
import { AuthGuard } from 'src/users_data/auth/auth.guard';

@Controller('refresh-token')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  async create(@Param() params: any, @Res() response: Response) {

    const jwsRefreshToken = await this.refreshTokenService.create(params.user.user_id);

    response.cookie('jwsRefreshToken', jwsRefreshToken, {
      httpOnly: true,
      secure: false, //set it to true
      maxAge: 14 * 24 * 60 * 60 * 1000,
    })

    return response.status(201).send()
  }

  @Post('/refresh')
  async refresh(@Req() request: Request, @Res() response: Response) {

    const ref_token = await request.cookies['jwsRefreshToken']

    if (!ref_token) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const { jwsToken, jwsRefreshToken } = await this.refreshTokenService.refreshToken(ref_token)

    response.cookie('jwsRefreshToken', jwsRefreshToken, {
      httpOnly: true,
      secure: false, //set it to true in production
      maxAge: 14 * 24 * 60 * 60 * 1000,
    })

    return response.status(200).send({ "jwsToken": jwsToken })
  }

  @Patch('/invalided')
  async invalided(@Req() request: Request, @Res() response: Response) {

    const ref_token = await request.cookies['jwsRefreshToken']

    if (!ref_token) {
      throw new UnauthorizedException('Refresh token not found');
    }

    await this.refreshTokenService.invalidedAToken(ref_token)

    response.cookie('jwsRefreshToken', '', {
      httpOnly: true,
      secure: false, //set it to true in production
      maxAge: 0,
    })

    return response.status(205).send()

  }
}
