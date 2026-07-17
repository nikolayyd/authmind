// /server/controller/auth.controller.ts

import { NextRequest, NextResponse } from 'next/server';
import { handleUserApiError } from '../utils/api-handler';
import { authService } from '../services/auth.service';
import { clearAuthCookies } from '../utils/cookies';

export const AuthController = {
  async signUp(req: Request) {
    try {
      const body = await req.json();
      const user = await authService.signUp(body);
      return NextResponse.json(user, { status: 201 });
    } catch (error: unknown) {
      return handleUserApiError(error);
    }
  },
  async signIn(req: Request) {
    try {
      const body = await req.json();
      const user = await authService.signIn(body);
      return NextResponse.json(user, { status: 200 });
    } catch (error: unknown) {
      return handleUserApiError(error);
    }
  },
  async signOut(req: NextRequest) {
    try {
      const refreshToken = req.cookies?.get?.('refreshToken')?.value;
      // В route handler-и, req е стандартен Request - виж бележката по-долу

      if (refreshToken) {
        await authService.signOut(refreshToken);
      }

      const response = NextResponse.json({
        message: 'Signed out successfully',
      });
      clearAuthCookies(response);
      return response;
    } catch (error: unknown) {
      return handleUserApiError(error);
    }
  },
};
