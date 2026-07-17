import { NextResponse } from 'next/server';
import { userService } from '../services/user.service';
import { handleUserApiError } from '../utils/api-handler';

export async function createUser(req: Request) {
  try {
    const body = await req.json();
    const user = await userService.create(body);
    return NextResponse.json(user, { status: 201 });
  } catch (error: unknown) {
    return handleUserApiError(error);
  }
}
