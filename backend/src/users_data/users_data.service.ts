import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersDatumDto } from './dto/users_datum.dto';
import { Repository } from 'typeorm';
import { User } from './entities/users_data.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersDataService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtSevice: JwtService,
  ) {}

  async signUp({email, password}: UsersDatumDto) {
    const emailInUse = await this.findOne(email)

    if (emailInUse) {
      throw new BadRequestException("Email already is used")
    }
    
    const hashedPassword = await bcrypt.hash(password, 8)

    const user = this.userRepository.create({email, password: hashedPassword})
    await this.userRepository.save(user);

    return this.login({email, password})
  }

  async login({email, password}: UsersDatumDto) {
    const user = await this.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Wrong credentials')
    }

    const passwordMatch = await bcrypt.compare(password, user.password) 

    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials')
    }

    return this.generateUserTokens(user.id, email)
  }

  async generateUserTokens(user_id, email) {
    const Token = this.jwtSevice.sign({user_id}, {expiresIn: '3d'})

    return {user_id, email, jwsToken: Token}
  }

  async findOne(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
