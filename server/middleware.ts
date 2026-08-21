// server/utils/require-auth.ts
import { NextRequest, NextResponse } from 'next/server';
import { tokenService } from '@/server/services/token.service';

export function requireAuth(
  req: NextRequest,
): { userId: string } | NextResponse {
  const accessToken = req.cookies.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const payload = tokenService.verifyAccessToken(accessToken);
    return { userId: payload.sub };
  } catch {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 },
    );
  }
}
