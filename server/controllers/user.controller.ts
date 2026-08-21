// /server/controllers/user.controller.ts — единственият за "текущ потребител"
import { NextRequest, NextResponse } from 'next/server';
import { handleTokenApiError } from '../utils/token.handler';
import { tokenService } from '../services/token.service';
import { userService } from '../services/user.service';

export const userController = {
  async getMe(req: NextRequest): Promise<NextResponse> {
    try {
      const accessToken = req.cookies.get('accessToken')?.value;
      if (!accessToken) {
        return NextResponse.json(
          { error: 'Not authenticated' },
          { status: 401 },
        );
      }
      const payload = tokenService.verifyAccessToken(accessToken);
      const user = await userService.findById(payload.sub);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
      return handleTokenApiError(error);
    }
  },
};
