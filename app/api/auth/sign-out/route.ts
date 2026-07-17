// app/api/auth/sign-out/route.ts
import { NextRequest } from 'next/server';
import { AuthController } from '@/server/controllers/auth.controller';

export async function POST(req: NextRequest) {
  return AuthController.signOut(req);
}
