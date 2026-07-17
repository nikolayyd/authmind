// /app/api/auth/sign-in/route.ts

import { AuthController } from '@/server/controllers/auth.controller';

export async function POST(req: Request) {
    return await AuthController.signIn(req);
}
