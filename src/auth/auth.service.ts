// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: any) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.usersService.create({ ...user, password: hashedPassword });
  }

  async validateOAuthLogin(user: any) {
    let existingUser = await this.usersService.findOneByEmail(user.email);
    if (!existingUser) {
      existingUser = await this.usersService.create({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: '', // Not applicable for OAuth users
      });
    }
    return this.login(existingUser);
  }
}
