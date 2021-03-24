import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const isPasswordMatching =  await bcrypt.compare(pass, user.password);
    if (user && isPasswordMatching) {
     delete user.password
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      user: {
        ...user.toObject(),
        token: this.jwtService.sign(payload),
      }
    }
  }

  async register(dto:RegisterDto):Promise<any>{
    const user = await this.usersService.findOne(dto.email);
    if(user) throw new BadRequestException('Email already in use.')
    dto.password = await bcrypt.hash(dto.password, 10);
    await this.usersService.register(dto);
  }
}
