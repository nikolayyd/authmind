// /server/utils/token.handler.ts

import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const handleTokenApiError = (error: unknown) => {
  if (error instanceof TokenExpiredError) {
    return NextResponse.json({ message: 'Token has expired' }, { status: 401 });
  }

  if (error instanceof JsonWebTokenError) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  console.error('Unhandled token error: ', error);
  return NextResponse.json(
    { message: 'Internal server error' },
    { status: 500 },
  );
};