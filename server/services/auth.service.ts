// /server/services/auth.service.ts

import { signInSchema, signUpSchema } from '@/lib/schemas/user.schema';
import { userService } from './user.service';
import bcrypt from 'bcrypt';
import { omitPasswordHash } from '../utils/sanitize';
import { tokenService } from './token.service';

export const authService = {
  async signUp(input: unknown) {
    const data = signUpSchema.parse(input);
    const user = await userService.create(data);
    const tokens = await tokenService.issueTokens(user.id);

    return { user: omitPasswordHash(user), ...tokens };
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

    const tokens = await tokenService.issueTokens(user.id);

    return { user: omitPasswordHash(user), ...tokens };
  },
  async signOut(refreshToken: string) {
    await tokenService.revokeRefreshToken(refreshToken);
  },
};
