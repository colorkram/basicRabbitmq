import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
const bcryptjs = require('bcryptjs');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async signUp(signUpUserDto: SignUpUserDto): Promise<any> {
    try {
      if (signUpUserDto.password !== signUpUserDto.password_confirm) {
        throw new BadRequestException('Passwords do not match!');
      }
  
      const userExists = await this.usersRepository.findOne({
        where: { username: signUpUserDto.username },
      });
  
      if (userExists) {
        throw new BadRequestException('This Email has already been used');
      }
  
      const hash = await this.funcHash(signUpUserDto.password);
  
      const createUser = {
        username: signUpUserDto.username,
        fullname: signUpUserDto.fullname,
        password: hash,
        phone: signUpUserDto.phone,
      };
  
      await this.usersRepository.save(createUser);
  
      return {
        status_code: HttpStatus.CREATED,
        message: 'User created successfully',
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('An error occurred during sign up');
    }
  }
  

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async funcHash(input: string): Promise<string> {
    try {
      const saltOrRounds = 10;
      const password = input;

      //hash password
      return await bcryptjs.hash(password, saltOrRounds);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
