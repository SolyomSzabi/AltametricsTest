import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(signInDto: Record<string, any>) {
    const { email, password } = signInDto;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!(await bcrypt.compare(password, user?.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: Record<string, any>) {
    const { email, password, name } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const newUser = await this.prisma.user.create({
      data: {
        email: email,
        password: await bcrypt.hash(password, 10),
        name: name,
      },
    });

    return newUser;
  }
}
