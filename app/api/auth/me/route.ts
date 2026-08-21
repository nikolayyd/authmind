// /app/api/auth/me/route.ts

import { userController } from '@/server/controllers/user.controller';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return await userController.getMe(req);
}
