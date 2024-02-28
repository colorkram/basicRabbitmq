import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { StatusType, UserType } from 'src/enums/constants-enum';
import { Not, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
const bcrypt = require("bcryptjs");

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private jwtService: JwtService,
) {}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async signIn(username, pass) {
    try {
        // const [ ip ] = req.ip.split(':').reverse() ?? [];
        // console.log(req.originalUrl, req.ips, ip );
        const user = await this.usersRepository.findOne({ where: [{ username: username, status: Not(StatusType.DELETED) }, { username: username, status: Not(StatusType.DELETED) }] });
        if (user == null)
            throw new NotFoundException(`ไม่พบข้อมูลผู้ใช้งาน :${username}`);
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            throw new NotFoundException(`รหัสผ่านไม่ถูกต้อง`);
            // throw new UnauthorizedException();
        }
        const tokens = await this.getTokens(user);

        // await this.updateRefreshActive(user.id);

        // await this.logService.addlog(user.id, req)
        // await this.addRefreshToken(user, tokens.refreshToken);
        return tokens;
    } catch (error) {
        throw new NotFoundException(error);
    }
}

async getTokens(user: User) {
  try {
      const username = user.username;
      const userId = user.id;
      var date = new Date();
      // const [secret, secret_refresh] = await this.getSecertKey(user.user_type);
      const [secret, secret_refresh] = [jwtConstants.secret, jwtConstants.secret_refresh];
      const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync(
              {
                  sub: userId,
                  username,
                  // user_type: user.user_type,
                  // firstname: user.firstname,
                  // lastname: user.lastname,
                  // username: user.email,
                  expires_date: new Date(date.setDate(date.getDate() + 1))
              },
              {
                  expiresIn: jwtConstants.expire_secret,
                  secret: secret
              },
          ),
          this.jwtService.signAsync(
              {
                  sub: userId,
                  username,
                  expires_date: new Date(date.setDate(date.getDate() + 7))
              },
              {
                  expiresIn: jwtConstants.expire_secret_refresh,
                  secret: secret_refresh
              },
          ),
      ]);

      return {
          accessToken,
          refreshToken,
      };
  } catch (error) {
      throw new NotFoundException(error);
  }
}

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
