// /server/controllers/token.controller.ts
import { NextRequest, NextResponse } from 'next/server';
import { tokenService } from '../services/token.service';
export const TokenController = {
  async refresh(req: NextRequest) {
    try {
      const refreshToken = req.cookies.get('refreshToken')?.value;

      if (!refreshToken) {
        return NextResponse.json(
          { error: 'Not authenticated' },
          { status: 401 },
        );
      }

      const tokens = await tokenService.refresh(refreshToken);
      const response = NextResponse.json({ success: true }, { status: 200 });

      response.cookies.set('accessToken', tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 15, // 15 minutes
      });
    } catch (error: unknown) {}
  },
};
