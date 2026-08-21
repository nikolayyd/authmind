// /server/services/token.service.ts
import { hashToken } from '../utils/crypto';
import { prisma } from '../db';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const ACCESS_TOKEN_EXPIRES_IN = '5m';
const REFRESH_TOKEN_EXPIRES_IN = '30m';

export const tokenService = {
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
  verifyAccessToken(token: string) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as { sub: string };
  },

  async revokeRefreshToken(refreshToken: string) {
    const hashedToken = hashToken(refreshToken);
    await prisma.refreshToken.updateMany({
      where: { hashedToken },
      data: { revokedAt: new Date() },
    });
  },
  async refresh(refreshToken: string) {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as {
      sub: string;
    };
    const hashedToken = hashToken(refreshToken);

    const stored = await prisma.refreshToken.findUnique({
      where: { hashedToken },
    });

    if (!stored) {
      throw new Error('Refresh token has been revoked');
    }

    if (stored.revokedAt) {
      await prisma.refreshToken.updateMany({
        where: { userId: stored.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });


      throw new Error('Refresh token reuse detected — all sessions revoked');
    }

    if (stored.expiresAt < new Date()) {
      throw new Error('Refresh token has expired');
    }

    await prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    });

    return this.issueTokens(payload.sub);
  },
};
