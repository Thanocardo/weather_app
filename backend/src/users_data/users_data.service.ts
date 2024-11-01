import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersDataLoginDto } from './dto/users_datum_login.dto';
import { Repository } from 'typeorm';
import { User } from './entities/users_data.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UsersDataSignUpDto } from './dto/users_datum_signup.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersDataService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtSevice: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp({email, password}: UsersDataSignUpDto) {
    
    const hashedPassword = await bcrypt.hash(password, 8)

    const user = this.userRepository.create({email, password: hashedPassword})
    await this.userRepository.save(user);

    return this.login({email, password})
  }

  async login({email, password}: UsersDataLoginDto) {

    const user = await this.findOne(email);

    const passwordMatch = await bcrypt.compare(password, user.password) 

    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials')
    }

    return this.generateUserTokens(user.id)
  }

  async generateUserTokens(user_id) {
    const Token = this.jwtSevice.sign({user_id}, {secret: this.configService.get('jwt.secret'), expiresIn: '30m'})

    return { jwsToken: Token }
  }

  async findOne(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
