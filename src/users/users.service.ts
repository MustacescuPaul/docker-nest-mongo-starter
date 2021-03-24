import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}


  async findOne(email: string): Promise<any> {
    return await await this.userModel.findOne({email:email}).exec();
  }

  async register(dto:RegisterDto):Promise<any>{
    return await this.userModel.create(dto);
  }
}
