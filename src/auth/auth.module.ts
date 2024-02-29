import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { SessionSerializer } from './Serializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthService,JwtStrategy,SessionSerializer,{
    provide: 'AUTH_SERVICE',
    useClass: AuthService,
}],
  exports: [TypeOrmModule,JwtModule],
})
export class AuthModule {}
