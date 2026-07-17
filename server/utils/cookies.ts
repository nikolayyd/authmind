// server/utils/cookies.ts

import { NextResponse } from 'next/server';

export const setAuthCookies = (
  response: NextResponse,
  accessToken: string,
  refreshToken: string,
) => {
  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 5 * 60, // 5 minutes
  });

  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/refresh',
    maxAge: 15 * 60, // 15 minutes
  });
};

export const clearAuthCookies = (response: NextResponse) => {
  response.cookies.set('accessToken', '', { maxAge: 0, path: '/' });
  response.cookies.set('refreshToken', '', { maxAge: 0, path: '/' });
};
