// /app/api/auth/sign-up/route.ts

import { AuthController } from '@/server/controllers/auth.controller';

export async function POST(req: Request) {
    return await AuthController.signUp(req);
}
