// /server/services/auth.service.ts

import { signInSchema, signUpSchema } from '@/lib/schemas/auth';
import { userService } from './user.service';
import { hashToken } from '../utils/crypto';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';
import bcrypt from 'bcrypt';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const ACCESS_TOKEN_EXPIRES_IN = '5m';
const REFRESH_TOKEN_EXPIRES_IN = '30m';

export const authService = {
  async issueTokens(userId: string) {
    const accessToken = jwt.sign({ sub: userId }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
    const refreshToken = jwt.sign({ sub: userId }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    const hashedToken = hashToken(refreshToken);

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 30);

    await prisma.refreshToken.create({
      data: {
        hashedToken,
        userId,
        expiresAt,
      },
    });

    return { accessToken, refreshToken };
  },
  async signUp(input: unknown) {
    const data = signUpSchema.parse(input);
    const user = await userService.create(data);
    const tokens = await this.issueTokens(user.id);

    const { passwordHash, ...safeUser } = user;
    return { user: safeUser, ...tokens };
  },
  async signIn(input: unknown) {
    const data = signInSchema.parse(input);
    const user = await userService.findByEmail(data.email);
    if (!user || !user.passwordHash) {
      throw new Error('Invalid credentials');
    }
    const isValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const tokens = await this.issueTokens(user.id);

    const { passwordHash, ...safeUser } = user;
    return { user: safeUser, ...tokens };
  },
  async signOut(refreshToken: string) {
    const hashedToken = hashToken(refreshToken);

    await prisma.refreshToken.updateMany({
      where: { hashedToken },
      data: { revokedAt: new Date() },
    });
  },
};
