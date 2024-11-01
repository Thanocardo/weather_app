import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RefreshToken } from './entities/refresh_token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenService {

  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async create(user_id) {
    const indentification_key = randomBytes(16).toString('hex')
    const ref_token = this.jwtService.sign({user_id, indentification_key}, {secret: this.configService.get('jwt.ref_secret'), expiresIn: '14d'})

    const decodedToken = await this.jwtService.decode(ref_token)
    
    const data = this.refreshTokenRepository.create({indentification_key: indentification_key, issued_at: decodedToken.iat, expires_at: decodedToken.exp, user_id: user_id})
    await this.refreshTokenRepository.save(data)

    return ref_token
  }

  async refTokenVerifier(ref_token) {
    try {
      this.jwtService.verify(ref_token, {secret: this.configService.get('jwt.ref_secret')});
    } 
    catch (error) {
      throw new UnauthorizedException();
    }

    const decodedToken = this.jwtService.decode(ref_token)

    let verified = await this.findRefreshToken(decodedToken)

    if (!verified) {
      throw new UnauthorizedException();
    }

    verified.valid = false

    this.refreshTokenRepository.save(verified)

    return decodedToken

  }

  async refreshToken(ref_token) {
    try {

      const validDecodedToken = await this.refTokenVerifier(ref_token)

      const new_ref_token = await this.create(validDecodedToken.user_id)
      
      const new_token = this.jwtService.sign({user_id: validDecodedToken.user_id}, {expiresIn: '30m'})

      return { jwsToken: new_token, jwsRefreshToken: new_ref_token }
    }
    catch (error) {

      throw error

    }

  }

  async invalidedAToken(token) {
    const decodedToken = this.jwtService.decode(token)

    let refToken = await this.findRefreshToken(decodedToken)

    refToken.valid = false

    await this.refreshTokenRepository.save(refToken)

  }

  async findRefreshToken(decodedToken) {
    return await this.refreshTokenRepository.findOne({
      where: {
        user_id: decodedToken.user_id,
        indentification_key: decodedToken.indentification_key,
        issued_at: decodedToken.iat,
        expires_at: decodedToken.exp,
        valid: true,
      }
    })
  }
}
